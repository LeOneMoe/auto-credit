import axios from "axios";


const getOptions = async () => {
    return await axios.get(`${process.env.SERVER_PATH}/options`).then(data => data.data)
}

export {getOptions}
