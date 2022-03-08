import axios from "axios";

const getNationality = async (key) => {
    return await axios.get(`http://localhost:8080/options/nationality`, key).then(data => data.data)
}

export {getNationality}
