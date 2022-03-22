import axios from "axios";
import {SERVER_PATH} from "../Constants";

const getById = async (clientId, loanId) => {
    return await axios.get(`${SERVER_PATH}/clients/${clientId}/loans/${loanId}`).then(data => data.data)
}

const getAll = async (clientId, params) => {
    for (const key of Object.keys(params)) {
        if (params[key] === ``) {
            delete params[key];
        }
    }

    return await axios.get(`${SERVER_PATH}/clients/${clientId}/loans`, {params}).then(data => data.data)
}

const create = async (clientId, params) => {
    return await axios.post(`${SERVER_PATH}/clients/${clientId}/loans/`, params).then(data => data.data)
}

const update = async (clientId, loanId, params) => {
    return await axios.put(`${SERVER_PATH}/clients/${clientId}/loans/${loanId}`, params)
}

const deleteById = async (clientId, loanId) => {
    return await axios.delete(`${SERVER_PATH}/clients/${clientId}/loans/${loanId}`).then(data => data.data)
}

export {getAll, getById, create, update, deleteById}
