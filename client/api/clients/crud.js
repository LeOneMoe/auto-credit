import axios from "axios";

const getById = async (id) => {
    return await axios.get(`http://localhost:8080/clients/${id}`).then(data => data.data)
}

const getAll = async (params) => {
    for (const key of Object.keys(params)) {
        if (params[key] === ``) {
            delete params[key];
        }
    }

    return await axios.get(`http://localhost:8080/clients`, {params}).then(data => data.data)
}

const create = async (params) => {
    return await axios.post(`http://localhost:8080/clients`, params).then(data => data.data)
}

const update = async (id, params) => {
    return await axios.put(`http://localhost:8080/clients/${id}`, params)
}

const deleteById = async (id) => {
    return await axios.delete(`http://localhost:8080/clients/${id}`).then(data => data.data)
}

export {getAll, getById, create, update, deleteById}
