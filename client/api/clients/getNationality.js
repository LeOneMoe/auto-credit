import axios from "axios";


const getNationality = async (key) => {
    console.log(`${process.env.NEXT_PUBLIC_SERVER_PATH}/options/nationality`)

    return await axios.get(`${process.env.NEXT_PUBLIC_SERVER_PATH}/options/nationality`, {
        params: key
    }).then(data => data.data)
}

export {getNationality}
