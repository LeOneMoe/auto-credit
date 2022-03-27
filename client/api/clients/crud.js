import axios from "axios";


const getById = async (id) => {
    return await axios.get(`${process.env.SERVER_PATH}/clients/${id}`).then(data => data.data)
}

const getAll = async (params) => {
    for (const key of Object.keys(params)) {
        if (params[key] === ``) {
            delete params[key];
        }
    }

    return await axios.get(`${process.env.SERVER_PATH}/clients`, {
        params,
        // headers: {
        //     "Authorization": `Bearer ${token}`
        // }
    }).then(data => data.data)
}

const create = async (params) => {
    return await axios.post(`${process.env.SERVER_PATH}/clients`, params).then(data => data.data)
}

const update = async (id, params) => {
    return await axios.put(`${process.env.SERVER_PATH}/clients/${id}`, params)
}

const deleteById = async (id) => {
    return await axios.delete(`${process.env.SERVER_PATH}/clients/${id}`).then(data => data.data)
}

export {getAll, getById, create, update, deleteById}
