import axios from "axios";

const getOptions = async () => {
    return await axios.get(`http://localhost:4200/options`).then(data => data.data)
}

export {getOptions}
