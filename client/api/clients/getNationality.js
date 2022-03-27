import axios from "axios";


const getNationality = async (key) => {
    return await axios.get(`${process.env.SERVER_PATH}/options/nationality`, {
        params: key
    }).then(data => data.data)
}

export {getNationality}
