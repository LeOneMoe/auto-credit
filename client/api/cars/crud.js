import axios from "axios";

const getById = async (clientId, carId) => {
    return await axios.get(`http://localhost:8080/clients/${clientId}/cars/${carId}`).then(data => data.data)
}

const getAllCarsAsOptions = async (clientId) => {
    const cars = await axios.get(`http://localhost:8080/clients/${clientId}/cars`).then(data => data.data)
    const options = []

    for (const carsKey in cars) {
        options.push({
            key: cars[carsKey].id,
            label: `${cars[carsKey].number} ${cars[carsKey].brand} ${cars[carsKey].model}`
        })
    }

    return options
}

const getUnusedCarsAsOptions = async (clientId, carId) => {
    const cars = await axios.get(`http://localhost:8080/clients/${clientId}/cars/unused`, {params: {currentCar: carId}}).then(data => data.data)
    const options = []

    for (const carsKey in cars) {
        options.push({
            key: cars[carsKey].id,
            label: `${cars[carsKey].number} ${cars[carsKey].brand} ${cars[carsKey].model}`
        })
    }

    return options
}

const getAll = async (clientId, params) => {
    for (const key of Object.keys(params)) {
        if (params[key] === ``) {
            delete params[key];
        }
    }

    return await axios.get(`http://localhost:8080/clients/${clientId}/cars`, {params}).then(data => data.data)
}

const create = async (clientId, params) => {
    return await axios.post(`http://localhost:8080/clients/${clientId}/cars/`, params).then(data => data.data)
}

const update = async (clientId, carId, params) => {
    console.log(clientId, carId, params)

    return await axios.put(`http://localhost:8080/clients/${clientId}/cars/${carId}`, params)
}

const deleteById = async (clientId, carId) => {
    return await axios.delete(`http://localhost:8080/clients/${clientId}/cars/${carId}`).then(data => data.data)
}

export {getAll, getById, create, update, deleteById, getUnusedCarsAsOptions, getAllCarsAsOptions}
