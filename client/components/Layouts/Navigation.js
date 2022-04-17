import Link from "next/link";
import classes from "../../styles/navigation.module.css";
import {signIn, signOut, useSession} from "next-auth/react";

export default function Navigation({title = `test`}) {
    const {data: session} = useSession()

    return (
        <div className={classes.header}>
            <h1 className={classes.logo}>{title}</h1>

            <nav className={classes.navigation}>
                <Link href={`/`}><a className={classes.link}>Home</a></Link>
                <Link href={`/clients`}><a className={classes.link}>Clients</a></Link>
                {/*<Link href={`/about`}><a className={classes.link}>About</a></Link>*/}


                {!session ?
                    <button className={classes.authButton} onClick={() => signIn()}>Sing in</button>
                    :
                    <button className={classes.authButton} onClick={() => signOut({callbackUrl: `/signin`})}>Sing out</button>
                }
            </nav>
        </div>
    )
}
