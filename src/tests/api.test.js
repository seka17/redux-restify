import api from '../api'

import { removePrivateFields } from 'helpers/nestedObjects'

import EntityList from '../api/models/EntityList'

import { ROUTER_LOCATION_CHANGE_ACTION } from '../constants'

import {
  store,
  beforeEachFunc,
  TEST_API_HOST,
  TEST_API_PREFIX,
  TEST_MODEL_ENDPOINT,

  modelUrl,
} from './testConfigs'


describe('api', () => {
  beforeEach(() => beforeEachFunc())

  it('provides an EntityList object for each registered model', () => {
    const state = store.getState()
    const testEntities = api.selectors.entityManager.testModel.getEntities(state)
    expect(testEntities).toEqual(jasmine.any(EntityList))
  })

  it('clears pages after router location changes', () => {
    const testData = [{ id: 1, test: true }, { id: 2, test: false }]
    store.dispatch(api.actions.entityManager.testModel.updateData(
      testData,
      1,
      10,
      2,
      {},
      undefined,
      {},
      false,
    ))
    let state = store.getState()
    const testArray = api.selectors.entityManager.testModel.getEntities(state).getArray()
    expect(removePrivateFields(testArray)).toEqual(testData)
    store.dispatch({
      type: ROUTER_LOCATION_CHANGE_ACTION,
      payload: {
        action: 'PUSH',
      },
    })
    state = store.getState()
    expect(state.api.entityManager.testModel.pages).toEqual({})
  })

  it('returns endpoint', () => {
    const endpoint = api.selectors.entityManager.testModel.getEndpoint()
    expect(endpoint).toEqual({
      apiHost: TEST_API_HOST,
      apiPrefix: TEST_API_PREFIX,
      endpoint: TEST_MODEL_ENDPOINT,
    })
  })

  const testServerArrayResponse = {
    count: 3,
    next: null,
    previous: null,
    results: [
      {
        id: 1,
        test: false,
      },
      {
        id: 2,
        test: false,
      },
      {
        id: 3,
        test: true,
      },
    ],
  }
  const mockRequest = (response = testServerArrayResponse, {
    url = `${modelUrl}?page=1&page_size=10`,
  } = {}) => {
    jasmine.Ajax.stubRequest(url).andReturn({
      status: 200,
      responseText: JSON.stringify(response),
      responseHeaders: [
        {
          name: 'Content-type',
          value: 'application/json',
        },
      ],
    })
  }
  describe('Server interactions', () => {
    beforeEach(() => {
      jasmine.Ajax.install()
    })

    afterEach(() => {
      jasmine.Ajax.uninstall()
    })

    it(`initializes a background server request for array and returns empty array for unloaded one,
      but doesn't make another request for same config`, (done) => {
      mockRequest()
      let currentArray = []
      const interval = setInterval(() => {
        const state = store.getState()
        currentArray = api.selectors.entityManager.testModel.getEntities(state).getArray()
        if (currentArray.length > 0) {
          clearInterval(interval)
          expect(currentArray).toEqual(testServerArrayResponse.results)
          done()
        } else {
          expect(currentArray).toEqual([])
        }
      }, 0)
    })

    it('can get a model asynchronously', (done) => {
      mockRequest()
      const state = store.getState()
      api.selectors.entityManager.testModel.getEntities(state).asyncGetArray()
        .then(array => {
          expect(array).toEqual(testServerArrayResponse.results)
          done()
        })
    })

    it('Throws an error for bad set pagination property', (done) => {
      mockRequest(testServerArrayResponse.results)
      const state = store.getState()
      api.selectors.entityManager.testModel.getEntities(state).asyncGetArray()
        .then(() => {
          done.fail('Expected to throw erorr on map function')
        })
        .catch((e) => {
          expect(e.message).toMatch(/testModel/)
          done()
        })
    })

    const modelResponse = {
      id: 1,
      special_id: 999,
      test: true,
    }

    it('can get a special model by empty id', (done) => {
      mockRequest(modelResponse, { url: modelUrl })
      let currentModel = {}
      const interval = setInterval(() => {
        const state = store.getState()
        currentModel = api.selectors.entityManager.testModel.getEntities(state).getById('')
        if (currentModel.test === modelResponse.test) {
          clearInterval(interval)
          done()
        }
      }, 0)
    })

    it('can get a model with special id field and map it to id field', (done) => {
      mockRequest(modelResponse, { url: `${modelUrl}${modelResponse.special_id}/` })
      let currentModel = {}
      const interval = setInterval(() => {
        const state = store.getState()
        currentModel = api.selectors.entityManager.testModelOtherId.getEntities(state).getById(modelResponse.special_id)
        if (
          currentModel.id === modelResponse.special_id &&
          currentModel.test === modelResponse.test
        ) {
          clearInterval(interval)
          done()
        }
      }, 0)
    })
  })
})