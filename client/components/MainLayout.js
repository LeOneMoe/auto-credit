import Head from "next/head";
import classes from "../styles/mainLayout.module.css"
import Navigation from "./Navigation";

function MainLayout({children, title = `Next App`}) {
    return (
        <>
            <Head>
                <title>{title} | Next course</title>
            </Head>

            <Navigation title={title}/>

            <main className={classes.main}>
                {children}
            </main>
        </>
    )
}

export {MainLayout}
