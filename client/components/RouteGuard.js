import {useRouter} from 'next/router';
import {getSession, signIn} from "next-auth/react";
import {useEffect} from "react";
import axios from "axios";

function RouteGuard({children}) {
    const router = useRouter()

    useEffect(() => {
        getSession().then(session => {
            if (!session) {
                axios.defaults.headers.common['Authorization'] = ``

                if (router.pathname !== `/signin` && router.pathname !== `/autherror`) {
                    signIn()
                }

            } else if (router.pathname !== `/signin` && session.error === `RefreshAccessTokenError`) {
                axios.defaults.headers.common['Authorization'] = ``
                signIn()

            } else {
                axios.defaults.headers.common['Authorization'] = `Bearer ${session.accessToken}`
            }
        })
    })

    return (children);
}

export {RouteGuard};
