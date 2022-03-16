import axios from "axios";

const getById = async (clientId, loanId) => {
    return await axios.get(`http://localhost:8080/clients/${clientId}/loans/${loanId}`).then(data => data.data)
}

const getAll = async (clientId, params) => {
    for (const key of Object.keys(params)) {
        if (params[key] === ``) {
            delete params[key];
        }
    }

    return await axios.get(`http://localhost:8080/clients/${clientId}/loans`, {params}).then(data => data.data)
}

const create = async (clientId, params) => {
    console.log(params)
    console.log(`sdddd`)
    console.log(params)
    console.log(`sdddd`)
    console.log(params)

    return await axios.post(`http://localhost:8080/clients/${clientId}/loans/`, params).then(data => data.data)
}

const update = async (clientId, loanId, params) => {
    return await axios.put(`http://localhost:8080/clients/${clientId}/loans/${loanId}`, params)
}

const deleteById = async (clientId, loanId) => {
    return await axios.delete(`http://localhost:8080/clients/${clientId}/loans/${loanId}`).then(data => data.data)
}

export {getAll, getById, create, update, deleteById}
