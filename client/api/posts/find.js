import axios from "axios";

const find = async (params) => {
    return await axios.get(`http://localhost:4200/posts`, {params}).then(data => data.data)
}

export {find}
