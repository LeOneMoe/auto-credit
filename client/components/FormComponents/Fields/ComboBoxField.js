import classes from "../Form.module.css"
import {Autocomplete, TextField} from "@mui/material";
import * as React from "react";
import {useEffect, useState} from "react";

const sx = {
    "& .MuiOutlinedInput-root": {
        color: "inherit",
        fontFamily: "inherit",
        "& fieldset": {
            border: "inherit",
        },
        "&.Mui-focused fieldset": {
            border: "inherit",
        },
        "&.MuiOutlinedInput-root": {
            border: "inherit",
            color: "inherit",
        },
    },
    "& .MuiInputBase-input": {
        color: "inherit",
        fontFamily: "inherit",
        "&.Mui-disabled": {
            color: "inherit",
            fontFamily: "inherit",
            WebkitTextFillColor: "inherit",
        }
    },
}

const ComboBoxField = ({
                           label,
                           name,
                           placeholder,
                           value,
                           handleChange,
                           handleBlur,
                           error,
                           options,
                           width = 20,
                           disabled = false
                       }) => {

    const [initOption, setInitOption] = useState({key: ``, label: ``})

    useEffect(() => {
        const getInitOption = () => {
            const result = options.find(option => option.key === value)
            setInitOption(result ? result : {key: ``, label: ``})
        }

        if (options) {
            getInitOption()
        }
    }, [options, value])

    return (
        <div className={classes.comboBoxField}>
            <div className={classes.label}>{label}</div>

            <div
                style={{width: width + `rem`}}
                className={classes.fieldWrapper}
            >
                <Autocomplete
                    value={initOption}

                    options={options}
                    getOptionLabel={option => option.label}

                    name={name}
                    isOptionEqualToValue={(option, value) => option.key === value.key}

                    onChange={(_, newValue) => {
                        handleChange(name, newValue ? newValue.key : ``)
                    }}
                    onBlur={handleBlur}

                    sx={{width: width + `rem`}}

                    disablePortal
                    autoComplete
                    autoHighlight

                    disabled={disabled}

                    renderInput={(params) =>
                        <TextField
                            {...params}
                            placeholder={disabled ? `` : placeholder}
                            className={classes.comboBoxInput}
                            sx={sx}
                        />
                    }
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

export {ComboBoxField}
