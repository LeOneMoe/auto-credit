import axios from "axios";
import {SERVER_PATH} from "../Constants";

const getNationality = async (key, req) => {
    return await axios.get(`${SERVER_PATH}/options/nationality`, {
        params: key,
        headers: {Authorization: "Bearer " + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsInJvbGVzIjpbIlJPTEVfQURNSU4iXSwiaXNzIjoiL2xvZ2luIiwiZXhwIjoxNjQ4MDM4OTE4fQ.HaiJycgp4MY61hni3LMoGyCwVaAo8kJlncYm6c6IRZ4"}
    }).then(data => data.data)
}

export {getNationality}
