import {
    GET_LOGS,
    SET_LOADING,
    LOGS_ERROR,
    ADD_LOG,
    DELETE_LOG,
    CLEAR_CURRENT,
    SET_CURRENT,
    UPDATE_LOG,
} from "./types";

// export const getLogs = () => {
//     return async (dispatch) => {
//         setLoading();
//         const res = await fetch("/logs");
//         const data = await res.json();

//         dispatch({
//             type: GET_LOGS,
//             payload: data,
//         });
//     };
// };

// we can return a function because of redux-thunk
// get logs from server
export const getLogs = () => async (dispatch) => {
    try {
        setLoading();
        const res = await fetch("/logs");
        const data = await res.json();

        dispatch({
            type: GET_LOGS,
            payload: data,
        });
    } catch (err) {
        dispatch({
            type: LOGS_ERROR,
            payload: err.response.data,
        });
    }
};
// add new logs
export const addLog = (log) => async (dispatch) => {
    try {
        setLoading();
        const res = await fetch("/logs", {
            method: "POST",
            body: JSON.stringify(log),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await res.json();

        dispatch({
            type: ADD_LOG,
            payload: data,
        });
    } catch (err) {
        dispatch({
            type: LOGS_ERROR,
            payload: err.response.data,
        });
    }
};

// delete log

export const deleteLog = (id) => async (dispatch) => {
    try {
        setLoading();
        await fetch(`/logs/${id}`, {
            method: "DELETE",
        });

        dispatch({
            type: DELETE_LOG,
            payload: id,
        });
    } catch (err) {
        dispatch({
            type: LOGS_ERROR,
            payload: err.response.data,
        });
    }
};

// update log on server

export const updateLog = (log) => async (dispatch) => {
    try {
        setLoading();
        const res = await fetch(`/logs/${log.id}`, {
            method: "PUT",
            body: JSON.stringify(log),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await res.json();

        dispatch({
            type: UPDATE_LOG,
            payload: data,
        });
    } catch (err) {
        dispatch({
            type: LOGS_ERROR,
            payload: err.response.statusText,
        });
    }
};

// setCurrent log

export const setCurrent = (log) => {
    return {
        type: SET_CURRENT,
        payload: log,
    };
};

// clearCurrent log

export const clearCurrent = () => {
    return {
        type: CLEAR_CURRENT,
    };
};

// set loading to true
export const setLoading = () => {
    return {
        type: SET_LOADING,
    };
};