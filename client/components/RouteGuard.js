import {getSession, signIn} from "next-auth/react";
import {useEffect} from "react";
import axios from "axios";
import {useRouter} from "next/router";
import {isUserHaveRoles} from "../util/RolesUtil";

const RouteGuard = ({children}) => {
    const router = useRouter()

    useEffect(() => {
        getSession().then(session => {
            isUserHaveRoles(session.roles)

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
