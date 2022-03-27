import Link from "next/link";
import classes from "../styles/error.module.css"
import {ErrorLayout} from "../components/ErrorLayout";
import {useEffect} from "react";

const NotFoundError = () => {
    useEffect(() => {
        const body = document.querySelector("body");
        document.body.classList.add();
        return () => {
            body.classList.remove("home");
        }
    });

    return (
        <ErrorLayout title={`Authentication error`}>
            <div className={classes.box}>
                <h1 className={classes.header}>Invalid </h1>
                <p className={classes.text}>Snap <Link href={`/`}><a>back to reality</a></Link></p>
            </div>
        </ErrorLayout>
    )
}

export default NotFoundError
