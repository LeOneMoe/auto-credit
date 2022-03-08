import axios from "axios";

const testGet = async () => {
    return await axios.get(`http://localhost:8080/summits/`).then(data => data.data)
}

export {testGet}