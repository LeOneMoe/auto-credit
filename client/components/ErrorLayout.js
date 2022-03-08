import Head from "next/head";
import classes from "../styles/errorLayout.module.css";
import Navigation from "./Navigation";

export function ErrorLayout({children, title = `Next App`}) {
    return (
        <>
            <Head>
                <title>Error {title} | Next course</title>
            </Head>

            <Navigation title={title}/>

            <main className={classes.error}>
                {children}
            </main>
        </>
    )
}