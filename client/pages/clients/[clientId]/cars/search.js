import {useFormik} from "formik";
import * as Yup from "yup";
import {MainLayout} from "../../../../components/MainLayout";

import {FormBody} from "../../../../components/FormComponents/FormBody"
import {TextField} from "../../../../components/FormComponents/Fields"
import {useRouter} from "next/router";
import CarsNavBar from "./_components/CarsNavBar";

const formValidation = Yup.object().shape({
    brand: Yup.string().nullable().trim(),
    model: Yup.string().nullable().trim(),
    number: Yup.string().nullable().trim(),
})

const FindCars = () => {
    const router = useRouter()

    const clientId = router.query.clientId

    const formik = useFormik({
        initialValues: {
            brand: ``,
            model: ``,
            number: ``,
        },
        validationSchema: formValidation,
        onSubmit: () => {
            router.push({
                pathname: `/clients/${clientId}/cars`,
                query: formik.values
            })
        }
    })

    return (
        <MainLayout title={`Search Posts`}>
            <CarsNavBar childPanelsEnabled={false} id={clientId}/>

            <FormBody
                isSearchMode

                createEnabled

                onCreate={() => router.push({
                    pathname: `/clients/create`
                })}

                onSubmit={formik.handleSubmit}
            >
                <TextField
                    label={`Brand`}
                    name={`brand`}
                    placeholder={'Input Brand'}
                    value={formik.values.brand}
                    handleChange={formik.handleChange}
                    handleBlur={formik.handleBlur}
                    error={formik.errors.brand}
                />

                <TextField
                    label={`Model`}
                    name={`model`}
                    placeholder={'Input Model'}
                    value={formik.values.model}
                    handleChange={formik.handleChange}
                    handleBlur={formik.handleBlur}
                    error={formik.errors.model}
                />

                <TextField
                    label={`Number`}
                    name={`number`}
                    placeholder={'Input Number'}
                    value={formik.values.number}
                    handleChange={formik.handleChange}
                    handleBlur={formik.handleBlur}
                    error={formik.errors.number}
                />
            </FormBody>
        </MainLayout>
    )
}

export default FindCars
