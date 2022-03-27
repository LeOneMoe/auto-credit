import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

async function refreshAccessToken(token) {
    try {
        const response = await axios.get(`${process.env.SERVER_PATH}/auth/token/refresh`, {
            headers: {
                "Authorization": `Bearer ${token.refreshToken}`
            }
        }).catch((error) => {
            throw error
        })

        const refreshedTokens = response.data

        return {
            accessToken: refreshedTokens.accessToken,
            refreshToken: refreshedTokens.refreshToken,
            expiresIn: refreshedTokens.expiresIn,
            error: null
        }
    } catch (error) {
        return {
            ...token,
            error: "RefreshAccessTokenError",
        }
    }
}


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
                const params = new URLSearchParams({
                    username: credentials.username,
                    password: credentials.password,
                })

                const response = await axios.post(`${process.env.SERVER_PATH}/login`, params)

                if (response) {
                    return response.data;
                } else {
                    return null
                }
            }
        }),
    ],
    secret: `secret`,
    pages: {
        signIn: '/signin',
        // signOut: '/auth/signout',
        // error: '/autherror',
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
                token.expiresIn = user.expiresIn
            }

            if (Date.now() >= token.expiresIn - 60 * 10) { // refresh token if it`s lifetime is less than 10min
                return refreshAccessToken(token);
            }

            return token
        },
        async session({session, token}) {
            session.user = token.user
            session.accessToken = token.accessToken
            session.expires = token.expiresIn
            session.error = token.error

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
