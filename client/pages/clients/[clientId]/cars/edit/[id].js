import {useFormik} from "formik";
import * as Yup from "yup";
import {MainLayout} from "../../../../../components/MainLayout";

import {FormBody} from "../../../../../components/FormComponents/FormBody"
import {DateField, MoneyField, TextField} from "../../../../../components/FormComponents/Fields"
import {getById, update} from "../../../../../api/cars/crud"
import {useRouter} from "next/router";
import CarsNavBar from "../_components/CarsNavBar";
import {getSession} from "next-auth/react";

const formValidation = Yup.object().shape({
    brand: Yup.string().nullable().trim().required(`Brand is required`),
    model: Yup.string().nullable().trim().required(`Model is required`),
    number: Yup.string().nullable().trim().required(`Number is required`),
    price: Yup.number().required(`Price is required`),
    dateOfPurchase: Yup.string().nullable().required(`Date of Purchase is required`),
})

const CreateCar = ({SSCar}) => {
    const router = useRouter()
    const clientId = router.query.clientId
    const carId = router.query.id

    const formik = useFormik({
        initialValues: {
            brand: SSCar.brand,
            model: SSCar.model,
            number: SSCar.number,
            price: SSCar.price,
            dateOfPurchase: SSCar.dateOfPurchase,
        },
        validationSchema: formValidation,
        onSubmit: () => {
            update(clientId, carId, formik.values).then(_ => {
                    router.push({
                        pathname: `/clients/${clientId}/cars/view/${carId}`,
                    })
                }
            )
        },
    })

    return (
        <MainLayout title={`Edit Car`}>
            <CarsNavBar id={clientId}/>

            <FormBody
                submitEnabled
                searchEnabled
                createEnabled

                onSearch={() => router.push({
                    pathname: `/clients/${clientId}/cars/search`
                })}

                onCreate={() => router.push({
                    pathname: `/clients/${clientId}/cars/create`
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

export const getServerSideProps = async ({query, req}) => {
    const {roles} = await getSession({req})
    const car = await getById(query.clientId, query.id)

    return {
        props: {
            SSCar: car,
        }
    }
}

export default CreateCar
