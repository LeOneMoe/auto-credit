import {getAll} from "../../../api/posts/crud";

const handler = async (req, res) => {
    // const result = await axios.get(`http://localhost:4200/posts`).then(data => data.data)

    res.status(200).json(await getAll())
}

export default handler
