export const NAME: "api";
export const DEFAULT_USE_SNAKE_CASE: true;
export const DEFAULT_API_NAME: "default";
export const DEFAULT_API_SORT_FIELD: "sort";
export const DOWNLOADING_URL: "downloading";
export const UPLOADING_URL: "uploading";
export const DEFAULT_PAGE_SIZE: 10;
export const DEFAULT_PAGE_NUMBER: 1;
export const DEFAULT_BACKEND_DATE_FORMAT: "YYYY-MM-DD";
export function queryFormat(query: any, config?: {}): string;
export function getPagesConfigHash(filter: any, sort: any, parentEntities: any, specialConfig: any, argPageSize: any, modelConfig: any): any;
export function getQueryHash(query: any): string;
export function getSpecialIdWithQuery(id: any, query: any, parentEntities: any): any;
export function getCacheValidationHashForId(id: any, asyncGetters: any): any;
export function getUrlWithParents(url: any, currentModel: any, parentEntities: any): any;
export const CRUD_ACTION_CREATE: "create";
export const CRUD_ACTION_UPDATE: "update";
export const CRUD_ACTION_DELETE: "delete";
export const CRUD_ACTION_READ: "read";
export const CRUD_ACTIONS: {
    [CRUD_ACTION_CREATE]: string;
    [CRUD_ACTION_UPDATE]: string;
    [CRUD_ACTION_DELETE]: string;
    [CRUD_ACTION_READ]: string;
};