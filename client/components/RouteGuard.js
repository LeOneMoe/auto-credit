import {useRouter} from 'next/router';
import {getSession} from "next-auth/react";

export {RouteGuard};

function RouteGuard({children}) {
    const router = useRouter();
    getSession().then(session => {
        if (!session) {
            if (router.pathname !== `/signin`) {
                console.log(session)
                console.log(router.pathname)

                router.push({
                    pathname: `/signin`
                })

            }
        }
    })

    return (children);
}
