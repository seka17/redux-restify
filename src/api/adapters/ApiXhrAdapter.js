import { objectToCamel } from '~/helpers/namingNotation'
import * as actions from '../actions/loadsManager'
import {
  DEFAULT_PAGE_SIZE,
  DEFAULT_API_SORT_FIELD,
  DEFAULT_BACKEND_DATE_FORMAT,
  queryFormat,
  DEFAULT_USE_SNAKE_CASE,
} from '../constants'


const CONTENT_TYPE_HEADER = 'Content-type'
const ACCEPT_HEADER = 'Accept'
const AUTH_HEADER = 'Authorization'
const CSRF_HEADER = 'X-CSRF-Token'

const CONTENT_TYPE_JSON = 'application/json'
const CONTENT_TYPE_PROBLEM_JSON = 'application/problem+json'
const CONTENT_TYPE_HTML = 'text/html'

const DEFAULT_RETIRES_COUNT = 0
const DEFAULT_RETIRES_TIMEOUT = 1000

const allow = [200, 201, 203, 204, 400, 404, 401, 403, 409, 422]

const checkStatus = (api, config) => {
  if (allow.includes(api.status)) {
    const responseType = api.getResponseHeader(CONTENT_TYPE_HEADER)
    if (config.isBinary) {
      return api.response
    }
    if (
      responseType &&
      (responseType.includes(CONTENT_TYPE_JSON) || responseType.includes(CONTENT_TYPE_PROBLEM_JSON)) &&
      api.responseText && api.responseText !== ''
    ) {
      try {
        const result = JSON.parse(api.responseText)
        return config.convertToCamelCase ? objectToCamel(result, config) : result
      } catch (e) {
        return {}
      }
    }
    if (responseType && responseType.includes(CONTENT_TYPE_HTML)) {
      return api.responseText
    }
    return api.responseText
  }
  return undefined
}

const defaultGetEntityUrl = ({
  apiHost,
  apiPrefix,
  modelEndpoint,
  entityId,
  specialAction,
}) => {
  let slashAfterId = ''
  if (entityId && (typeof entityId === 'number' || typeof entityId === 'string' && !entityId.endsWith('/'))) {
    slashAfterId = '/'
  }
  const baseUrl = `${modelEndpoint}${entityId || ''}${slashAfterId}${specialAction || ''}`
  const slash = baseUrl.endsWith('/') || baseUrl.includes('?') ? '' : '/'
  return `${apiHost}${apiPrefix}${baseUrl}${slash}`
}

const defaultGetGenericModel = (fieldValue) => ({
  // eslint-disable-next-line no-underscore-dangle
  modelType: fieldValue._object,
  model: fieldValue,
})

const defaultGetGenericFormField = (model) => ({
  _object: model.$modelType,
  id: model.id,
})

class ApiXhrAdapter {
  constructor({
    getToken, // Function () => apiToken (string)
    getCSRFToken, // Function () => CSRFToken (string)
    getHeaders, // Function () => Headers (object)
    apiHost, // Host of current api
    apiPrefix, // Api url prefix for all api request, for ex: /api/v1.0
    dispatch, // redux dispatch for loadsManager and callbacks actions
    allowedNoTokenEndpoints = [], // Array of endpoints, that can be called without token
    // Dict of actions dispatched on special http response codes, for ex: { 403: logout }
    // Also can be a function (code) => dict or action to dispatch
    httpCodesCallbacks = {},
    defaultPageSize = DEFAULT_PAGE_SIZE, // Default page size for lists requests
    deafultDateFormat = DEFAULT_BACKEND_DATE_FORMAT, // Default date format for formatting moment objects
    defaultSortField = DEFAULT_API_SORT_FIELD, // Default query param name for sorting option
     // Transform array server response into restify array info(elements, count etc)
     // (response, pagination) => ({ data: [], count: 1, page: 1})
     // pagination is user-defined propery of model, that describes, if model has pagination
     // response is a pure server response(only converted to camelCase)
     // data should be an array of model objects
     // count should represent all objects count, that are available on server (if api provides such field)
     // page is number of page in server pagination(if api provides such field)
    transformArrayResponse,
    // Get custom url for manipulating entity CRUD
    // ({apiHost, apiPrefix, modelEndpoint, entityId, crudAction, specialAction}) => 'url'
    getEntityUrl = defaultGetEntityUrl,
    // Transform single entity server response into restify model info(model data from server)
    // (response) => ({ data: {} })
    // should return an object with data field, that can be mapped into restify entity
    transformEntityResponse,
    // Transform error response
    // (response) => ({ errors: {} })
    // should return an object with errors
    transformErrorResponse,
    // Get generic model representation for RestifyGenericForeignKey
    // (genericFieldRawValue) => ({ modelType: 'model', model: {} })
    getGenericModel = defaultGetGenericModel,
    // Get form field value for applyFormData with mapServerDataToIds: true
    // (model) => model.id
    getGenericFormField = defaultGetGenericFormField,
    // Get pagination query with function like
    // (userQuery, page, pageSize) => newQueryWithPagination
    getPaginationQuery,
    // Auth merhod, token is appended to it, like this: Token <token>
    authMethod = 'Token',
    // XHR parameter for requests
    withCredentials = false,
    // Use auto snake_case convertation
    useSnakeCase = DEFAULT_USE_SNAKE_CASE,

    // @deprecated this api is very poor constructed and should not be used
    alertAction, // TODO by @deylak need to think of entities CRUD callback api
  }) {
    this.getToken = getToken
    this.getCSRFToken = getCSRFToken
    this.getHeaders = getHeaders
    this.apiHost = apiHost
    this.apiPrefix = apiPrefix
    this.dispatch = dispatch
    this.allowedNoTokenEndpoints = allowedNoTokenEndpoints
    this.httpCodesCallbacks = httpCodesCallbacks
    this.defaultPageSize = defaultPageSize
    this.deafultDateFormat = deafultDateFormat
    this.defaultSortField = defaultSortField
    this.transformArrayResponse = transformArrayResponse
    this.transformEntityResponse = transformEntityResponse
    this.transformErrorResponse = transformErrorResponse
    this.getPaginationQuery = getPaginationQuery
    this.getEntityUrl = getEntityUrl
    this.getGenericModel = getGenericModel
    this.getGenericFormField = getGenericFormField
    this.authMethod = authMethod
    this.withCredentials = withCredentials
    this.useSnakeCase = useSnakeCase

    this.alertAction = alertAction
  }

  asyncDispatch(...args) {
    return new Promise(res => {
      setTimeout(() => {
        const result = this.dispatch(...args)
        if (result instanceof Promise) {
          result.then((value) => {
            res(value)
          })
        } else {
          res()
        }
      }, 0)
    })
  }

  httpCallBackInvoke(api, data) {
    let currentCodes = this.httpCodesCallbacks
    if (typeof this.httpCodesCallbacks === 'function') {
      currentCodes = this.httpCodesCallbacks(api.status, data)
    }

    if (typeof currentCodes === 'function') {
      return this.dispatch(currentCodes())
    }
    if (typeof currentCodes === 'object' && currentCodes[api.status]) {
      return this.dispatch(currentCodes[api.status]())
    }
    return Promise.resolve(false)
  }

  /**
   * Make a call to some url, wrapper for xhr
   * @param  {string} baseUrl   base url, like api host
   * @param  {HttpMethod} argMethod HTTP method
   * @param  {{
      getEntityUrl: ({
        apiPrefix;
        modelEndpoint;
        entityId;
        crudAction;
        specialAction;
      }) => string;
      withoutPrefix: boolean;
      id: RestifyId;
      crudAction: CrudActions;
      specialAction: string;
      query: Record<string, any>;
      forceMethod: HttpMethods;
      data: Record<string, any>;
      urlHash: string;
      skipLoadsManager: boolean;
      isBinary: boolean;
      onXhrReady: (api: xhr) => void;
      retries: number;
      retryTimeoutMs: number;
   * }} config - request options
   * @return {Promise} promise of the request
   */
  callApi(baseUrl, argMethod, config) {
    const method = argMethod.toUpperCase()
    let retriesLeft = config.retries || DEFAULT_RETIRES_COUNT
    return new Promise((res, rej) => {
      const createXhrInstanse = async (isRetry) => {
        const makeRetry = () => {
          createXhrInstanse(true)
        }

        const api = new XMLHttpRequest()

        let CSRFToken
        if (typeof this.getCSRFToken === 'function') {
          CSRFToken = this.getCSRFToken(this.dispatch)
        }
        if (CSRFToken instanceof Promise) {
          CSRFToken = await CSRFToken
        }

        let token
        const getToken = config.getToken || this.getToken
        if (typeof getToken === 'function') {
          token = getToken(this.dispatch)
        }
        if (token instanceof Promise) {
          token = await token
        }
        const isTokenRequired = !this.allowedNoTokenEndpoints.some(endpoint => {
          if (typeof endpoint === 'string') return endpoint === baseUrl
          if (endpoint instanceof RegExp) return endpoint.test(baseUrl)
          return false
        })
        if (!token && isTokenRequired) {
          console.warn(`Called ${baseUrl} which requires token, but there was no token found!`)
          rej({ status: 401 })
          return
        }
        let url = (config.getEntityUrl || this.getEntityUrl)({
          apiHost: this.apiHost,
          apiPrefix: config.withoutPrefix ? '/' : this.apiPrefix,
          modelEndpoint: baseUrl,
          entityId: config.id,
          crudAction: config.crudAction,
          specialAction: config.specialAction,
        })
        let methodToUse = method
        if (typeof url === 'object') {
          methodToUse = url.method
          url = url.url
        }
        if (config.query && Object.keys(config.query).length) {
          url += `?${queryFormat(config.query, {
            dateFormat: this.deafultDateFormat,
            useSnakeCase: this.useSnakeCase,
          })}`
        }
        api.open((config.forceMethod || methodToUse).toUpperCase(), url)
        api.withCredentials = this.withCredentials
        // Hack for some browsers sending wrong accept headers, causing DRF to return browsable api
        api.setRequestHeader(ACCEPT_HEADER, '*/*')
        if (token) {
          const authMethod = config.authMethod === undefined ? this.authMethod : config.authMethod
          api.setRequestHeader(AUTH_HEADER, `${authMethod || ''}${authMethod ? ' ' : ''}${token}`)
        }
        if (CSRFToken) {
          api.setRequestHeader(CSRF_HEADER, CSRFToken)
        }

        if (typeof this.getHeaders === 'function') {
          const headers = await this.getHeaders(baseUrl)
          Object.keys(headers).forEach(header => {
            api.setRequestHeader(header, headers[header])
          })
        }

        let form
        let filename
        if (config.data) {
          const dataArr = Object.entries(config.data)
          const checkFile = dataArr.some(val => {
            if (val[1] instanceof Blob) {
              if (val[1] instanceof File) {
                filename = val[1].name
              }
              return true
            }
            return false
          })
          if (checkFile) {
            form = new FormData()
            dataArr.forEach(([key, val]) => {
              if (val instanceof Blob && !(val instanceof File)) {
                form.append(key, val, 'blob.jpg')
              } else {
                form.append(key, val)
              }
            })
          } else {
            form = typeof config.data === 'object' ? JSON.stringify(config.data) : config.data
            api.setRequestHeader(CONTENT_TYPE_HEADER, `${CONTENT_TYPE_JSON}; charset=utf-8`)
          }
        }
        let urlQuery = config.urlHash
        if (!urlQuery && (config.query || filename)) {
          urlQuery = {
            ...config.query,
            filename,
          }
        }
        const addLoadAct = method === 'GET' ? actions.addDownload : actions.addUpload
        const removeLoadAct = method === 'GET' ? actions.removeDownload : actions.removeUpload
        let firedMutex
        const fireLoadActIfNotfiredMutex = () => {
          if (!firedMutex) {
            if (!isRetry && !config.skipLoadsManager) {
              this.dispatch(addLoadAct(baseUrl, urlQuery))
            }
            firedMutex = true
          }
        }
        api.upload.onprogress = (e) => {
          fireLoadActIfNotfiredMutex()
          const progress = (e.loaded / e.total) * 100
          if (!config.skipLoadsManager) {
            this.dispatch(actions.setLoadingProgress(progress, baseUrl, urlQuery))
          }
        }
        api.onloadstart = fireLoadActIfNotfiredMutex
        api.onload = async () => {
          const loadedData = checkStatus(api, config)
          const shouldRetry = await this.httpCallBackInvoke(api, loadedData)
          if (shouldRetry) {
            makeRetry()
            return
          }

          if (!config.skipLoadsManager) {
            this.asyncDispatch(removeLoadAct(baseUrl, urlQuery))
          }
          res({
            status: api.status,
            data: loadedData,
            api,
          })
        }
        api.onerror = async (e) => {
          if (api.status === 0 && retriesLeft > 0) {
            retriesLeft -= 1
            setTimeout(
              makeRetry,
              config.retryTimeoutMs === undefined ? DEFAULT_RETIRES_TIMEOUT : config.retryTimeoutMs,
            )
            return
          }
          const loadedData = checkStatus(api, config)
          const shouldRetry = await this.httpCallBackInvoke(api, loadedData)
          if (shouldRetry) {
            makeRetry()
            return
          }

          this.dispatch(removeLoadAct(baseUrl, urlQuery))
          this.dispatch(actions.setLoadingError(e.error))

          let responseText = api.responseText
          if (api.status < 100) {
            responseText = ''
          }

          rej({
            status: api.status,
            data: JSON.parse(responseText || '{}'),
            api,
          })
        }
        if (config.isBinary) {
          api.responseType = 'arraybuffer'
        }
        const sendRequest = () => api.send(form)
        let xhrResult
        if (typeof config.onXhrReady === 'function') {
          xhrResult = config.onXhrReady(api)
        }
        if (xhrResult instanceof Promise) {
          xhrResult.then(sendRequest)
        } else {
          sendRequest()
        }
      }
      createXhrInstanse(false)
    })
  }

  callGet(baseUrl, config) {
    return this.callApi(baseUrl, 'GET', config)
  }

  callPost(baseUrl, config) {
    return this.callApi(baseUrl, 'POST', config)
  }

  callPut(baseUrl, config) {
    return this.callApi(baseUrl, 'PUT', config)
  }

  callPatch(baseUrl, config) {
    return this.callApi(baseUrl, 'PATCH', config)
  }

  callDel(baseUrl, config) {
    return this.callApi(baseUrl, 'DELETE', config)
  }
}

export default ApiXhrAdapter
