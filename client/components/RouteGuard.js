import {useRouter} from 'next/router';
import {getSession, signIn} from "next-auth/react";
import {useEffect} from "react";

function RouteGuard({children}) {
    const router = useRouter()

    useEffect(() => {
        getSession().then(session => {
            if (!session) {
                if (router.pathname !== `/signin` && router.pathname !== `/autherror`) {
                    signIn()
                }

            } else if (router.pathname !== `/signin` && session.error === `RefreshAccessTokenError`) {
                signIn()
            }
        })
    })

    return (children);
}

export {RouteGuard};
