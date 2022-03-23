import axios from "axios";
import {SERVER_PATH} from "../Constants";

const getById = async (id) => {
    return await axios.get(`${SERVER_PATH}/clients/${id}`).then(data => data.data)
}

const getAll = async (params) => {
    for (const key of Object.keys(params)) {
        if (params[key] === ``) {
            delete params[key];
        }
    }

    return await axios.get(`${SERVER_PATH}/clients`, {
        params,
        // headers: {
        //     "Authorization": `Bearer ${token}`
        // }
    }).then(data => data.data)
}

const create = async (params) => {
    return await axios.post(`${SERVER_PATH}/clients`, params).then(data => data.data)
}

const update = async (id, params) => {
    return await axios.put(`${SERVER_PATH}/clients/${id}`, params)
}

const deleteById = async (id) => {
    return await axios.delete(`${SERVER_PATH}/clients/${id}`).then(data => data.data)
}

export {getAll, getById, create, update, deleteById}
