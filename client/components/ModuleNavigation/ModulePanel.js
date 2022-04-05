import Link from "next/link";
import classes from "./ModuleNavigation.module.css"

export const ModulePanel = ({name, href, as, isCurrent = false}) => {
    return (
        <Link href={href} as={as} passHref>
            <div className={`${classes.modulePanel} ` + (isCurrent ? `${classes.currentPanel}` : ``)}>
                {name}
            </div>
        </Link>
    )
}

export default ModulePanel
