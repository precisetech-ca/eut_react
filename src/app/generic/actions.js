export const CALL_GENERIC_SAGA = "CALL_GENERIC_SAGA";
export const CALL_GENERIC_SAGA_FAILED = "CALL_GENERIC_SAGA_FAILED";

export const CALL_GENERIC_GETTER_SAGA = "CALL_GENERIC_GETTER_SAGA";
export const CALL_GENERIC_GETTER_SAGA_FAILED = "CALL_GENERIC_GETTER_SAGA_FAILED";

export const callGenericAsync = (payload, endpoint, method, callback) => ({
    type: CALL_GENERIC_SAGA, payload, endpoint, method, callback
})

export const callGenericGetterAsync = (endpoint, callback) => ({
    type: CALL_GENERIC_GETTER_SAGA, endpoint, callback
})
