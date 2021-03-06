export const TEST_API_HOST: "http://test.com/";
export const TEST_TOKEN: "test-token";
export const TEST_API_PREFIX: "test-api/v1.0/";
export const OTHER_TEST_API_PREFIX: "other-test-api/v2.0/";
export const CUSTOM_TEST_API_PREFIX: "custom-test-api/data/";
export const TEST_MODEL_ENDPOINT: "test-model/";
export const modelUrl: string;
export const customModelBulkUrl: string;
export const customModelSingleUrl: string;
export const responseHeaders: {
    name: string;
    value: string;
}[];
export const apiDefinitions: {
    [x: number]: {
        getToken: () => string;
        apiHost: string;
        apiPrefix: string;
        allowedNoTokenEndpoints: never[];
        httpCodesCallbacks: () => void;
    };
    testApi: {
        getToken: () => string;
        apiHost: string;
        apiPrefix: string;
        allowedNoTokenEndpoints: never[];
        httpCodesCallbacks: () => void;
    };
    otherTestApi: {
        getToken: () => string;
        apiHost: string;
        apiPrefix: string;
        allowedNoTokenEndpoints: never[];
        httpCodesCallbacks: () => void;
    };
    customTestApi: {
        getToken: () => string;
        apiHost: string;
        apiPrefix: string;
        allowedNoTokenEndpoints: never[];
        httpCodesCallbacks: () => void;
    };
    customTestApiConfigured: {
        getToken: () => string;
        apiHost: string;
        apiPrefix: string;
        allowedNoTokenEndpoints: never[];
        httpCodesCallbacks: () => void;
        transformArrayResponse: (response: any) => {
            data: any;
            count: any;
        };
        getEntityUrl: (options: any) => string | {
            url: string;
            method: string;
        };
    };
    camelCaseTestApi: {
        getToken: () => string;
        apiHost: string;
        apiPrefix: string;
        allowedNoTokenEndpoints: never[];
        httpCodesCallbacks: () => void;
        useSnakeCase: boolean;
    };
};
export namespace modelsDefinitions {
    export namespace testModel {
        export const apiName: string;
        export { TEST_MODEL_ENDPOINT as endpoint };
        export const name: string;
        export namespace defaults {
            export const id: undefined;
            export const test: any;
            export const notInForeignKey: undefined;
        }
    }
    export namespace testCacheModel {
        const apiName_1: string;
        export { apiName_1 as apiName };
        export { TEST_MODEL_ENDPOINT as endpoint };
        const name_1: string;
        export { name_1 as name };
        export namespace defaults_1 {
            const id_1: undefined;
            export { id_1 as id };
            const test_1: undefined;
            export { test_1 as test };
            const notInForeignKey_1: undefined;
            export { notInForeignKey_1 as notInForeignKey };
        }
        export { defaults_1 as defaults };
    }
    export namespace testChild1Model {
        const apiName_2: string;
        export { apiName_2 as apiName };
        export const parent: string;
        export { TEST_MODEL_ENDPOINT as endpoint };
        const name_2: string;
        export { name_2 as name };
        export namespace defaults_2 {
            const id_2: undefined;
            export { id_2 as id };
            const test_2: undefined;
            export { test_2 as test };
        }
        export { defaults_2 as defaults };
    }
    export namespace testChildUnregisteredModel {
        const apiName_3: string;
        export { apiName_3 as apiName };
        const parent_1: string;
        export { parent_1 as parent };
        export { TEST_MODEL_ENDPOINT as endpoint };
        const name_3: string;
        export { name_3 as name };
        export namespace defaults_3 {
            const id_3: undefined;
            export { id_3 as id };
            const test_3: undefined;
            export { test_3 as test };
        }
        export { defaults_3 as defaults };
    }
    export namespace testChild2Model {
        const apiName_4: string;
        export { apiName_4 as apiName };
        const parent_2: string[];
        export { parent_2 as parent };
        export { TEST_MODEL_ENDPOINT as endpoint };
        const name_4: string;
        export { name_4 as name };
        export namespace defaults_4 {
            const id_4: undefined;
            export { id_4 as id };
            const test_4: undefined;
            export { test_4 as test };
        }
        export { defaults_4 as defaults };
    }
    export namespace testModelNested {
        const apiName_5: string;
        export { apiName_5 as apiName };
        export { TEST_MODEL_ENDPOINT as endpoint };
        const name_5: string;
        export { name_5 as name };
        export namespace defaults_5 {
            const id_5: undefined;
            export { id_5 as id };
            const test_5: RestifyField;
            export { test_5 as test };
        }
        export { defaults_5 as defaults };
    }
    export namespace testModelNested2 {
        const apiName_6: string;
        export { apiName_6 as apiName };
        export { TEST_MODEL_ENDPOINT as endpoint };
        const name_6: string;
        export { name_6 as name };
        export namespace defaults_6 {
            const id_6: undefined;
            export { id_6 as id };
            export namespace test_6 {
                export const nested: undefined;
            }
            export { test_6 as test };
            export const notNested: undefined;
        }
        export { defaults_6 as defaults };
        export const pagination: boolean;
    }
    export namespace testModelNested3 {
        const apiName_7: string;
        export { apiName_7 as apiName };
        export { TEST_MODEL_ENDPOINT as endpoint };
        const name_7: string;
        export { name_7 as name };
        export namespace defaults_7 {
            const id_7: undefined;
            export { id_7 as id };
            const test_7: any;
            export { test_7 as test };
        }
        export { defaults_7 as defaults };
    }
    export namespace testModelNested4 {
        const apiName_8: string;
        export { apiName_8 as apiName };
        export { TEST_MODEL_ENDPOINT as endpoint };
        const name_8: string;
        export { name_8 as name };
        export namespace defaults_8 {
            const id_8: undefined;
            export { id_8 as id };
            export namespace test_8 {
                export const foreignKey: RestifyForeignKey;
            }
            export { test_8 as test };
        }
        export { defaults_8 as defaults };
    }
    export namespace testModelOtherId {
        export const clearDataOnRouteChange: boolean;
        const apiName_9: string;
        export { apiName_9 as apiName };
        export { TEST_MODEL_ENDPOINT as endpoint };
        const name_9: string;
        export { name_9 as name };
        export const idField: string;
        export namespace defaults_9 {
            export const specialId: undefined;
            const test_9: undefined;
            export { test_9 as test };
        }
        export { defaults_9 as defaults };
    }
    export namespace testModelForClearData {
        const apiName_10: string;
        export { apiName_10 as apiName };
        export { TEST_MODEL_ENDPOINT as endpoint };
        const name_10: string;
        export { name_10 as name };
        export namespace defaults_10 {
            const id_9: undefined;
            export { id_9 as id };
            const test_10: undefined;
            export { test_10 as test };
        }
        export { defaults_10 as defaults };
    }
    export namespace testModelWithForeignKey {
        const apiName_11: string;
        export { apiName_11 as apiName };
        export { TEST_MODEL_ENDPOINT as endpoint };
        const name_11: string;
        export { name_11 as name };
        const pagination_1: boolean;
        export { pagination_1 as pagination };
        export namespace defaults_11 {
            const id_10: undefined;
            export { id_10 as id };
            const test_11: undefined;
            export { test_11 as test };
            export const singleForeignKey: RestifyForeignKey;
            export const notInArray: RestifyForeignKeysArray;
            const notInForeignKey_2: undefined;
            export { notInForeignKey_2 as notInForeignKey };
        }
        export { defaults_11 as defaults };
    }
    export namespace testModelWithForeignKey2 {
        const apiName_12: string;
        export { apiName_12 as apiName };
        export { TEST_MODEL_ENDPOINT as endpoint };
        const name_12: string;
        export { name_12 as name };
        const pagination_2: boolean;
        export { pagination_2 as pagination };
        export namespace defaults_12 {
            const id_11: undefined;
            export { id_11 as id };
            export const foreignKeys: RestifyForeignKeysArray;
        }
        export { defaults_12 as defaults };
    }
    export namespace testModelWithForeignKey3 {
        const apiName_13: string;
        export { apiName_13 as apiName };
        export { TEST_MODEL_ENDPOINT as endpoint };
        const name_13: string;
        export { name_13 as name };
        const pagination_3: boolean;
        export { pagination_3 as pagination };
        export namespace defaults_13 {
            const id_12: undefined;
            export { id_12 as id };
            const foreignKeys_1: RestifyForeignKeysArray;
            export { foreignKeys_1 as foreignKeys };
        }
        export { defaults_13 as defaults };
    }
    export namespace testModelWithForeignKey4 {
        const apiName_14: string;
        export { apiName_14 as apiName };
        export { TEST_MODEL_ENDPOINT as endpoint };
        const name_14: string;
        export { name_14 as name };
        const pagination_4: boolean;
        export { pagination_4 as pagination };
        export namespace defaults_14 {
            const id_13: undefined;
            export { id_13 as id };
            const test_12: undefined;
            export { test_12 as test };
            const singleForeignKey_1: RestifyForeignKey;
            export { singleForeignKey_1 as singleForeignKey };
            const notInArray_1: RestifyForeignKeysArray;
            export { notInArray_1 as notInArray };
            const notInForeignKey_3: undefined;
            export { notInForeignKey_3 as notInForeignKey };
        }
        export { defaults_14 as defaults };
    }
    export namespace testNestedModelWithForeignKey {
        const apiName_15: string;
        export { apiName_15 as apiName };
        export { TEST_MODEL_ENDPOINT as endpoint };
        const name_15: string;
        export { name_15 as name };
        const pagination_5: boolean;
        export { pagination_5 as pagination };
        export namespace defaults_15 {
            const id_14: undefined;
            export { id_14 as id };
            const test_13: undefined;
            export { test_13 as test };
            const singleForeignKey_2: RestifyForeignKey;
            export { singleForeignKey_2 as singleForeignKey };
            const notInArray_2: RestifyForeignKeysArray;
            export { notInArray_2 as notInArray };
            const notInForeignKey_4: undefined;
            export { notInForeignKey_4 as notInForeignKey };
            export const nestedRestifyField: any;
            export namespace nestedSimpleObject {
                const singleForeignKey_3: RestifyForeignKey;
                export { singleForeignKey_3 as singleForeignKey };
            }
        }
        export { defaults_15 as defaults };
    }
    export namespace testModelWithoutRequests {
        const apiName_16: string;
        export { apiName_16 as apiName };
        export { TEST_MODEL_ENDPOINT as endpoint };
        export const allowIdRequests: boolean;
        const name_16: string;
        export { name_16 as name };
        export namespace defaults_16 {
            const test_14: any;
            export { test_14 as test };
        }
        export { defaults_16 as defaults };
    }
    export namespace recursiveModelFirst {
        const apiName_17: string;
        export { apiName_17 as apiName };
        export { TEST_MODEL_ENDPOINT as endpoint };
        const name_17: string;
        export { name_17 as name };
        export namespace defaults_17 {
            const id_15: undefined;
            export { id_15 as id };
            const foreignKey_1: RestifyForeignKey;
            export { foreignKey_1 as foreignKey };
        }
        export { defaults_17 as defaults };
    }
    export namespace recursiveModelSecond {
        const apiName_18: string;
        export { apiName_18 as apiName };
        export { TEST_MODEL_ENDPOINT as endpoint };
        const name_18: string;
        export { name_18 as name };
        export namespace defaults_18 {
            const id_16: undefined;
            export { id_16 as id };
            const foreignKey_2: RestifyForeignKey;
            export { foreignKey_2 as foreignKey };
        }
        export { defaults_18 as defaults };
    }
    export namespace customModel {
        const apiName_19: string;
        export { apiName_19 as apiName };
        export { TEST_MODEL_ENDPOINT as endpoint };
        const name_19: string;
        export { name_19 as name };
        export namespace defaults_19 {
            const id_17: undefined;
            export { id_17 as id };
            const test_15: undefined;
            export { test_15 as test };
        }
        export { defaults_19 as defaults };
        const pagination_6: boolean;
        export { pagination_6 as pagination };
        export { customGetEntityUrl as getEntityUrl };
        export { customTransformArrayResponse as transformArrayResponse };
    }
    export namespace customModelSingleEntityResponse {
        const apiName_20: string;
        export { apiName_20 as apiName };
        export { TEST_MODEL_ENDPOINT as endpoint };
        const name_20: string;
        export { name_20 as name };
        export namespace defaults_20 {
            const id_18: undefined;
            export { id_18 as id };
            const test_16: any;
            export { test_16 as test };
        }
        export { defaults_20 as defaults };
        const pagination_7: boolean;
        export { pagination_7 as pagination };
        export { customGetEntityUrl as getEntityUrl };
        export function transformEntityResponse(response: any): {
            data: any;
        };
    }
    export namespace customModelConfigured {
        const apiName_21: string;
        export { apiName_21 as apiName };
        export { TEST_MODEL_ENDPOINT as endpoint };
        const name_21: string;
        export { name_21 as name };
        const pagination_8: boolean;
        export { pagination_8 as pagination };
        export namespace defaults_21 {
            const id_19: undefined;
            export { id_19 as id };
            const test_17: undefined;
            export { test_17 as test };
        }
        export { defaults_21 as defaults };
    }
    export namespace genericModel {
        const apiName_22: string;
        export { apiName_22 as apiName };
        export { TEST_MODEL_ENDPOINT as endpoint };
        const name_22: string;
        export { name_22 as name };
        export namespace defaults_22 {
            export const genericField: RestifyGenericForeignKey;
        }
        export { defaults_22 as defaults };
    }
    export namespace camelCaseTestModel {
        const apiName_23: string;
        export { apiName_23 as apiName };
        export { TEST_MODEL_ENDPOINT as endpoint };
        const name_23: string;
        export { name_23 as name };
        export namespace defaults_23 {
            const id_20: undefined;
            export { id_20 as id };
            export const testCamelCase: undefined;
        }
        export { defaults_23 as defaults };
    }
    export namespace testModelWithDeepNest1 {
        const apiName_24: string;
        export { apiName_24 as apiName };
        export { TEST_MODEL_ENDPOINT as endpoint };
        const name_24: string;
        export { name_24 as name };
        export namespace defaults_24 {
            const id_21: undefined;
            export { id_21 as id };
            export const nest1: RestifyForeignKey;
        }
        export { defaults_24 as defaults };
    }
    export namespace testModelWithDeepNest2 {
        const apiName_25: string;
        export { apiName_25 as apiName };
        export { TEST_MODEL_ENDPOINT as endpoint };
        const name_25: string;
        export { name_25 as name };
        export namespace defaults_25 {
            const id_22: undefined;
            export { id_22 as id };
            export const nest2: RestifyForeignKey;
        }
        export { defaults_25 as defaults };
    }
    export namespace testModelWithDeepNest3 {
        const apiName_26: string;
        export { apiName_26 as apiName };
        export { TEST_MODEL_ENDPOINT as endpoint };
        const name_26: string;
        export { name_26 as name };
        export namespace defaults_26 {
            const id_23: undefined;
            export { id_23 as id };
            export const nest3: undefined;
        }
        export { defaults_26 as defaults };
    }
}
export namespace formsDefinitions {
    export namespace testForm {
        export const model: string;
        export namespace defaults_27 {
            export const transformedField: undefined;
            const test_18: boolean;
            export { test_18 as test };
            export const testArray: ({
                test: boolean;
                orderable?: undefined;
            } | {
                orderable: boolean;
                test?: undefined;
            })[];
        }
        export { defaults_27 as defaults };
        export namespace transformBeforeSubmit {
            export function transformedField_1(key: any, value: any, formValues: any): any;
            export { transformedField_1 as transformedField };
        }
    }
    export namespace testDirtyForm {
        const model_1: string;
        export { model_1 as model };
        export namespace defaults_28 {
            const test_19: undefined;
            export { test_19 as test };
            export const testDirty: undefined;
        }
        export { defaults_28 as defaults };
        export const trackDirtyFields: boolean;
        export const submitOnlyDirtyFields: boolean;
    }
    export namespace testRequestFormId {
        const model_2: string;
        export { model_2 as model };
        export namespace defaults_29 {
            const test_20: undefined;
            export { test_20 as test };
        }
        export { defaults_29 as defaults };
    }
    export namespace testRequestFormOtherId {
        const model_3: string;
        export { model_3 as model };
        export namespace defaults_30 {
            const test_21: undefined;
            export { test_21 as test };
        }
        export { defaults_30 as defaults };
    }
    export namespace foreignKeyTestForm {
        const model_4: string;
        export { model_4 as model };
        export namespace defaults_31 {
            const test_22: undefined;
            export { test_22 as test };
            const singleForeignKey_4: undefined;
            export { singleForeignKey_4 as singleForeignKey };
            const notInArray_3: never[];
            export { notInArray_3 as notInArray };
            const notInForeignKey_5: undefined;
            export { notInForeignKey_5 as notInForeignKey };
            export namespace nestedRestifyField_1 {
                const singleForeignKey_5: undefined;
                export { singleForeignKey_5 as singleForeignKey };
            }
            export { nestedRestifyField_1 as nestedRestifyField };
            export namespace nestedSimpleObject_1 {
                const singleForeignKey_6: undefined;
                export { singleForeignKey_6 as singleForeignKey };
            }
            export { nestedSimpleObject_1 as nestedSimpleObject };
        }
        export { defaults_31 as defaults };
        export const mapServerDataToIds: boolean;
    }
    export namespace arrayTestForm {
        const model_5: string;
        export { model_5 as model };
        export namespace defaults_32 {
            export const arrayField: ({
                test: boolean;
                count?: undefined;
            } | {
                count: number;
                test?: undefined;
            })[];
        }
        export { defaults_32 as defaults };
        export function transformBeforeSubmit_1(data: any): any;
        export { transformBeforeSubmit_1 as transformBeforeSubmit };
    }
    export namespace requestCustomFormId {
        const model_6: string;
        export { model_6 as model };
        export namespace defaults_33 {
            const test_23: undefined;
            export { test_23 as test };
        }
        export { defaults_33 as defaults };
    }
    export namespace requestCustomFormIdConfigured {
        const model_7: string;
        export { model_7 as model };
        export namespace defaults_34 {
            const test_24: undefined;
            export { test_24 as test };
        }
        export { defaults_34 as defaults };
    }
    export namespace genericTestForm {
        const model_8: string;
        export { model_8 as model };
        export namespace defaults_35 {
            const id_24: undefined;
            export { id_24 as id };
            const genericField_1: undefined;
            export { genericField_1 as genericField };
        }
        export { defaults_35 as defaults };
        const mapServerDataToIds_1: boolean;
        export { mapServerDataToIds_1 as mapServerDataToIds };
    }
}
export let store: any;
export function beforeEachFunc(config?: {}): void;
import RestifyField from "../api/models/RestifyField";
import RestifyForeignKey from "../api/models/RestifyForeignKey";
import RestifyForeignKeysArray from "../api/models/RestifyForeignKeysArray";
declare function customGetEntityUrl({ apiHost, apiPrefix, modelEndpoint, entityId, crudAction, }: {
    apiHost: any;
    apiPrefix: any;
    modelEndpoint: any;
    entityId: any;
    crudAction: any;
}): string;
declare function customTransformArrayResponse(response: any): {
    data: any;
    count: any;
};
import RestifyGenericForeignKey from "../api/models/RestifyGenericForeignKey";
export {};
