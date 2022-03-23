import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import {SERVER_PATH} from "../../../api/Constants"

const options = {
    providers: [CredentialsProvider({
        name: `Sing in AutoCredit CRM...`, credentials: {
            username: {label: `Username`, type: `text`, placeholder: `username`},
            password: {label: `Password`, type: `password`}
        },
        async authorize(credentials, req) {

            const params = new URLSearchParams()
            params.append(`username`, credentials.username)
            params.append(`password`, credentials.password)

            const response = await axios.post(`${SERVER_PATH}/login`, params)

            console.log(response)

            if (response) {
                return response.data;
            } else {
                return null
            }
        }
    }),], pages: {
        signIn: '/signin',
        // signOut: '/auth/signout',
        // error: '/auth/error',
        // verifyRequest: '/auth/verify-request',
        // newUser: '/auth/new-user'
    }, session: {
        strategy: `jwt`,
        // maxAge: 30 * 60 // 30 minutes
    }, callbacks: {
        async jwt({token, user, account}) {
            if (account && user) {
                return {
                    ...token,
                    accessToken: user.access_token,
                    refreshToken: user.refresh_token,
                };
            }

            return token;
        },
        async session({session, token}) {
            session.user.accessToken = token.accessToken;
            session.user.refreshToken = token.refreshToken;
            session.user.accessTokenExpires = token.accessTokenExpires;

            return session;
        },
    },
    debug: true
}

export default (req, res) => NextAuth(req, res, options)

// export default (req, res) => NextAuth(req, res, options)
