import classes from "./Form.module.css"

const FieldGroup = ({label, children}) => {
    return (
        <>
            <div>
                {label}
            </div>
            <div className={classes.fieldGroup}>
                {children}
            </div>
        </>
    )
}

export default FieldGroup
