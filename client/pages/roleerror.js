import Link from "next/link";
import classes from "../styles/error.module.css"
import {ErrorLayout} from "../components/ErrorLayout";
import {useEffect} from "react";

const RoleError = () => {
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
                <p className={classes.text}>Go back to<Link href={`/`}><a> home screen</a></Link></p>
            </div>
        </ErrorLayout>
    )
}

export default RoleError
