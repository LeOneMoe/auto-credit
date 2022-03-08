import {getById} from "../../../api/posts/crud";

const postHandler = async ({query: {id}}, res) => {
    // const result = await axios.get(`http://localhost:4200/posts/${id}`).then(data => data.data)

    res.status(200).json(await getById(id))
}

export default postHandler
