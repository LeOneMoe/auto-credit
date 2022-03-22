import axios from "axios";
import {SERVER_PATH} from "../Constants";

const getById = async (clientId, carId) => {
    return await axios.get(`${SERVER_PATH}/clients/${clientId}/cars/${carId}`).then(data => data.data)
}

const getAllCarsAsOptions = async (clientId) => {
    const cars = await axios.get(`${SERVER_PATH}/clients/${clientId}/cars`).then(data => data.data)
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
    const cars = await axios.get(`${SERVER_PATH}/clients/${clientId}/cars/unused`, {params: {currentCar: carId}}).then(data => data.data)
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

    return await axios.get(`${SERVER_PATH}/clients/${clientId}/cars`, {params}).then(data => data.data)
}

const create = async (clientId, params) => {
    return await axios.post(`${SERVER_PATH}/clients/${clientId}/cars/`, params).then(data => data.data)
}

const update = async (clientId, carId, params) => {
    return await axios.put(`${SERVER_PATH}/clients/${clientId}/cars/${carId}`, params)
}

const deleteById = async (clientId, carId) => {
    return await axios.delete(`${SERVER_PATH}/clients/${clientId}/cars/${carId}`).then(data => data.data)
}

export {getAll, getById, create, update, deleteById, getUnusedCarsAsOptions, getAllCarsAsOptions}
