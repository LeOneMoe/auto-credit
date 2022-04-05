import {useFormik} from "formik";
import * as Yup from "yup";
import {MainLayout} from "../../../../components/MainLayout";

import {FormBody} from "../../../../components/FormComponents/FormBody"
import {DateField, MoneyField, TextField} from "../../../../components/FormComponents/Fields"
import {create} from "../../../../api/cars/crud"
import {useRouter} from "next/router";
import CarsNavBar from "./_components/CarsNavBar";

const formValidation = Yup.object().shape({
    brand: Yup.string().nullable().trim().required(`Brand is required`),
    model: Yup.string().nullable().trim().required(`Model is required`),
    number: Yup.string().nullable().trim().required(`Number is required`),
    price: Yup.number().required(`Price is required`),
    dateOfPurchase: Yup.string().nullable(),
})

const CreateCar = () => {
    const router = useRouter()

    const clientId = router.query.clientId

    const formik = useFormik({
        initialValues: {
            brand: ``,
            model: ``,
            number: ``,
            price: ``,
            dateOfPurchase: ``,
        },
        validationSchema: formValidation,
        onSubmit: () => {
            console.log(clientId)
            console.log(`/clients/${clientId}/cars/view/`)
            // console.log(formik.values)

            create(clientId, formik.values).then(r =>
                router.push({
                    pathname: `/clients/${clientId}/cars/view/${r.id}`,
                })
            )
        }
    })

    return (
        <MainLayout title={`Search Posts`}>
            <CarsNavBar childPanelsEnabled={false} id={clientId}/>

            <FormBody
                searchEnabled
                submitEnabled

                onCreate={() => router.push({
                    pathname: `/clients/${clientId}/cars/create`
                })}

                onSearch={() => router.push({
                    pathname: `/clients/${clientId}/cars/search`
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

                <MoneyField
                    label={`Price`}
                    name={`price`}
                    placeholder={'₽ 0.00'}
                    value={formik.values.price}
                    handleChange={formik.handleChange}
                    handleBlur={formik.handleBlur}
                    error={formik.errors.price}
                />

                <DateField
                    label={`Date Of Purchase`}
                    name={`dateOfPurchase`}
                    inputFormat={`dd/MM/yyyy`}
                    value={formik.values.dateOfPurchase}
                    handleChange={formik.setFieldValue}
                    handleBlur={formik.handleBlur}
                    error={formik.errors.dateOfPurchase}
                />
            </FormBody>
        </MainLayout>
    )
}

export default CreateCar
