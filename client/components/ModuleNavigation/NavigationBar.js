import classes from "./ModuleNavigation.module.css"

const NavigationBar = ({children}) => {
    return (
        <div className={classes.navigationBar} >
            {children}
        </div>
    )
}

export default NavigationBar
