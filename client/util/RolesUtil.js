import {getSession} from "next-auth/react";

const isUserHaveRoles = (roles) => {
    const session = getSession().then(data => data)

    console.log(session)
}

export {isUserHaveRoles}
