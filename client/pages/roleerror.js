import classes from "../styles/error.module.css"
import {ErrorLayout} from "../components/Layouts/ErrorLayout";
import {useEffect} from "react";
import {useRouter} from "next/router";

const RoleError = () => {
    const router = useRouter()

    useEffect(() => {
        const body = document.querySelector("body");
        document.body.classList.add();
        return () => {
            body.classList.remove("home");
        }
    });

    return (
        <ErrorLayout title={`Role Error`}>
            <div className={classes.box}>
                <h1 className={classes.header}>You don't have required role to see this page</h1>
                <p onClick={() => router.back()} className={classes.text}>Go back to home screen</p>
            </div>
        </ErrorLayout>
    )
}

export default RoleError
