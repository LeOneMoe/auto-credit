import Head from "next/head";
import classes from "../../styles/mainLayout.module.css"
import Navigation from "./Navigation";

function MainLayout({children, title = `Next App`}) {
    return (
        <>
            <Head>
                <title>{title} | Auto Credit CRM</title>
            </Head>

            <Navigation title={title}/>

            <main className={classes.main}>
                {children}
            </main>
        </>
    )
}

export {MainLayout}
