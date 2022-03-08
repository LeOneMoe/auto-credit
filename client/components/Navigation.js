import Link from "next/link";
import classes from "../styles/navigation.module.css";

export default function Navigation({title = `test`}) {
    return (
        <div className={classes.header}>
            <h1 className={classes.logo}>{title}</h1>

            <nav className={classes.navigation}>
                <Link href={`/`}><a className={classes.link}>Home</a></Link>
                <Link href={`/posts`}><a className={classes.link}>Posts</a></Link>
                <Link href={`/about`}><a className={classes.link}>About</a></Link>
            </nav>
        </div>
    )
}
