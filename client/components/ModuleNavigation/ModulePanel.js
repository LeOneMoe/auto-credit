import Link from "next/link";
import classes from "./ModuleNavigation.module.css"

export const ModulePanel = ({name, href, as, isCurrent = false}) => {
    return (
        <div className={`${classes.modulePanel} ` + (isCurrent ? `${classes.currentPanel}` : ``)}>
            <Link href={href} as={as} passHref>
                {name}
            </Link>
        </div>
    )
}

export default ModulePanel
