import axios from "axios";
import {getToken} from "next-auth/jwt";

// need to do something

const secret = process.env.SECRET

export default async (req, res) => {
    console.log(`__________________________`)

    const token = await getToken({req, secret})
    console.log(token)

    const apiClient = axios.create({
        baseURL: process.env.NEXT_PUBLIC_SERVER_PATH,
        headers: {'Authorization': `Bearer ${token}`}
    })

    apiClient.interceptors.response.use(
        (response) => {
            return response
        },
        (error) => {
            // console.log(error)
            return Promise.reject(error)
        }
    )

    if (req.method === `GET` && req.query) {
        const params = req.query

        for (const key of Object.keys(params)) {
            if (params[key] === ``) {
                delete params[key];
            }
        }

        res.status(200).json(apiClient.get(`/clients`, params))

    } else if (req.method === `POST`) {
        return apiClient.post(`/clients`, req.body).then(data => data.data)
    }
}
