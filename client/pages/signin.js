import {signIn} from "next-auth/react"
import {useFormik} from "formik";
import * as Yup from "yup";
import {useRouter} from "next/router";
import {useState} from "react";

const formValidation = Yup.object().shape({
    username: Yup.string().required(`Username is required`),
    password: Yup.string().required(`Passport is required`),
})

const SignIn = ({}) => {
    const router = useRouter();
    const [error, setError] = useState(null);

    const formik = useFormik({
        initialValues: {
            username: `admin`,
            password: `admin`,
        },
        validationSchema: formValidation,
        onSubmit: (values, {setSubmitting}) => {
            const res = signIn('credentials', {
                redirect: `/`,
                username: values.username,
                password: values.password,
                callbackUrl: `${window.location.origin}`,
            })

            if (res.error) {
                setError(res.error)
            } else {
                setError(null)
            }
            if (res.url) {
                router.push(res.url)
            }

            setSubmitting(false)
        }
    })

    return (
        <div>
            Welcome
            <form onSubmit={formik.handleSubmit}>
                {error}

                <label> Username
                    <input type="text" name="username" autoComplete={`username`}
                           value={formik.values.username}
                           onChange={formik.handleChange}
                           onBlur={formik.handleBlur}
                    />
                </label>

                <label> Password
                    <input type="password" name="password" autoComplete={`current-password`}
                           value={formik.values.password}
                           onChange={formik.handleChange}
                           onBlur={formik.handleBlur}
                    />
                </label>

                <button type={`submit`}>Sign in</button>
            </form>
        </div>
    )
}

export default SignIn
