import classes from "../Form.module.css"

const TextField = ({
                       label,
                       name,
                       placeholder,
                       value,
                       handleChange,
                       handleBlur,
                       error,
                       width = 20,
                       disabled = false,
                       type = `text`,
                       autoComplete = null
                   }) => {
    return (
        <div className={classes.field}>
            <div className={classes.label}>{label}</div>

            <div className={classes.fieldWrapper} style={{width: width + `rem`}}>
                <input
                    className={classes.input}
                    type={type}
                    autoComplete={autoComplete}
                    name={name}
                    placeholder={disabled ? `` : placeholder}
                    value={value}
                    onChange={handleChange}
                    readOnly={!handleChange}
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
