import axios from "axios";

const getById = async ({id}) => {
    return await axios.get(`http://localhost:4200/posts/${id}`).then(data => data.data)
}

const getAll = async () => {
    return await axios.get(`http://localhost:4200/posts`).then(data => data.data)
}

export {getAll, getById}