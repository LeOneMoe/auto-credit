import axios from "axios";
import {SERVER_PATH} from "../Constants";

const getNationality = async (key) => {
    return await axios.get(`${SERVER_PATH}/options/nationality`, key).then(data => data.data)
}

export {getNationality}
