import {signIn} from "next-auth/react"
import {useFormik} from "formik";
import * as Yup from "yup";
import {useRouter} from "next/router";
import {useState} from "react";

import classes from "../styles/login.module.css"
import {TextField} from "../components/FormComponents/Fields";

const formValidation = Yup.object().shape({
    username: Yup.string().required(`Username is required`),
    password: Yup.string().required(`Passport is required`),
})

const SignIn = ({}) => {
    const router = useRouter();
    const [error, setError] = useState(null);

    const formik = useFormik({
        initialValues: {
            username: ``,
            password: ``,
        },
        validationSchema: formValidation,
        onSubmit: async (values, {setSubmitting}) => {
            const res = await signIn('credentials', {
                redirect: null,
                username: values.username,
                password: values.password,
                callbackUrl: `${window.location.origin}`,
            })

            if (res.error) {
                console.log(res.error)
                setError(`Invalid combination of username and password`)
            } else {
                setError(null)
            }
            if (res.url) {
                await router.push(res.url)
            }

            setSubmitting(false)
        }
    })

    return (
        <div className={classes.form}>
            <div className={classes.panel}>
                <div>
                    <div>
                        Welcome to AutoCredit CRM
                    </div>
                    <div>
                        Please, login to system
                    </div>
                </div>

                <form onSubmit={formik.handleSubmit} className={classes.credentials}>
                    <div className={classes.error}>
                        {error}
                    </div>

                    <TextField
                        width={20}
                        type={`text`}
                        name={`username`}
                        placeholder={`username`}
                        autoComplete={`username`}
                        value={formik.values.username}
                        handleChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <TextField
                        width={20}
                        type={`password`}
                        name={`password`}
                        placeholder={`password`}
                        autoComplete={`current-password`}
                        value={formik.values.password}
                        handleChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />

                    <button type={`submit`}>Sign in</button>
                </form>
            </div>
        </div>
    )
}

export default SignIn
