import {getProviders, getSession} from "next-auth/react"

const SignIn = ({providers}) => {
    return (
        <div>
            Welcome
            <form method={`post`} action={`/api/auth/callback/credentials`}>
                <label> Username
                    <input type="text" name="username" autoComplete={`username`}/>
                </label>

                <label> Password
                    <input type="password" name="password" autoComplete={`current-password`}/>
                </label>

                <button type={`submit`}>Sign in</button>
            </form>
        </div>
    )
}

// export const getServerSideProps = async (context) => {
//     const {req, res} = context
//     const session = await getSession({req})
//
//     if (session && res && session.accessToken) {
//         res.writeHead(
//             302,
//             {Location: `/`}
//         )
//         res.end()
//
//         return;
//     }
//
//     return {
//         props: {
//             session: null,
//             providers: await getProviders()
//         }
//     }
// }

export default SignIn
