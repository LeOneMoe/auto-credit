import * as React from 'react';
import NumberFormat from 'react-number-format';
import Input from '@mui/material/Input';
import classes from "../Form.module.css";


const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(props, ref) {
    const {onChange, ...other} = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={ref}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            thousandSeparator
            isNumericString
            decimalScale={2}
            prefix="₽ "
        />
    );
});

function MoneyField({
                        label,
                        name,
                        placeholder,
                        value,
                        handleChange,
                        handleBlur,
                        error,
                        width = 20,
                        disabled = false,
                        readOnly = false,
                        labelWidth = `15rem`
                    }) {
    return (

        <div className={classes.field}>
            <div className={classes.label} style={{width: labelWidth}}>{label}</div>

            <div className={classes.fieldWrapper} style={{width: width + `rem`}}>
                <Input
                    className={classes.input}
                    disableUnderline={true}
                    fullWidth
                    placeholder={disabled ? `` : placeholder}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    inputComponent={NumberFormatCustom}
                    disabled={disabled}
                    readOnly={readOnly}
                />
            </div>

            {error && (
                <div className={classes.error}>
                    {error}
                </div>
            )}
        </div>
    );
}

export {MoneyField}
