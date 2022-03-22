import axios from "axios";
import {SERVER_PATH} from "../Constants";

const getOptions = async () => {
    return await axios.get(`${SERVER_PATH}/options`).then(data => data.data)
}

export {getOptions}
