import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import {SERVER_PATH} from "../../../api/Constants"

const options = {
    providers: [
        CredentialsProvider({
            id: `credentials`,
            name: `Credentials`,
            credentials: {
                username: {label: `Username`, type: `text`, placeholder: `username`},
                password: {label: `Password`, type: `password`}
            },
            async authorize(credentials) {
                const params = new URLSearchParams()
                params.append(`username`, credentials.username)
                params.append(`password`, credentials.password)

                const response = await axios.post(`${SERVER_PATH}/login`, params)

                if (response) {
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
        // maxAge: 30 * 60 // 30 minutes
    },
    callbacks: {
        async jwt({token, account, user}) {
            if (account) {
                token.accessToken = user.accessToken
                token.refreshToken = user.refreshToken
            }

            return token;
        },
        async session({session, token}) {
            session.accessToken = token.accessToken

            axios.defaults.headers.common['Authorization'] = `Bearer ${session.accessToken}`

            return session
        },
        async redirect({url, baseUrl}) {
            if (url === baseUrl + `/signin`) {
                axios.defaults.headers.common['Authorization'] = ``
            }

            if (url.startsWith(baseUrl)) {
                return url
            } else if (url.startsWith("/")) {
                return new URL(url, baseUrl).toString()
            }

            return baseUrl
        }
    },
    debug: false
}

export default (req, res) => NextAuth(req, res, options)
