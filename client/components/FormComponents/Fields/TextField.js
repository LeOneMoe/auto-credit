import classes from "../Form.module.css"

const TextField = ({label, name, placeholder, value, handleChange, handleBlur, error, width = 20, disabled=false}) => {
    return (
        <div className={classes.field}>
            <div className={classes.label}>{label}</div>

            <div className={classes.fieldWrapper} style={{width: width + `rem`}}>
                <input
                    className={classes.input}
                    type="text"
                    name={name}
                    placeholder={disabled ? `` : placeholder}
                    value={value}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={disabled}
                />
            </div>

            {error && (
                <div className={classes.error}>
                    {error}
                </div>
            )}
        </div>
    )
}

export {TextField}
