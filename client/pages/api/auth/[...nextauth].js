import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import {SERVER_PATH} from "../../../api/Constants"

const options = {
    providers: [
        CredentialsProvider({
            name: `Sing in AutoCredit CRM...`,
            credentials: {
                username: {label: `Username`, type: `text`, placeholder: `username`},
                password: {label: `Password`, type: `password`}
            },
            async authorize(credentials, req) {
                console.log(credentials)

                const params = new URLSearchParams()
                params.append(`username`, credentials.username)
                params.append(`password`, credentials.password)

                console.log(params)

                const response = await axios.post(`${SERVER_PATH}/login`, params)

                if (response) {
                    console.log(response.data)
                    return response.data;
                } else {
                    return null
                }
            }
        }),
    ],
    pages: {
        signIn: '/signin',
        // signOut: '/auth/signout',
        // error: '/auth/error',
        // verifyRequest: '/auth/verify-request',
        // newUser: '/auth/new-user'
    },
    session: {
        strategy: `jwt`,
        maxAge: 30 * 60 // 30 minutes
    },
    debug: true
}

export default (req, res) => NextAuth(req, res, options)

// export default (req, res) => NextAuth(req, res, options)
