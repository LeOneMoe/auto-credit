import {useFormik} from "formik";
import * as Yup from "yup";
import {MainLayout} from "../../../../components/MainLayout";
import {useState} from "react";

import {FormBody} from "../../../../components/FormComponents/FormBody"
import {ComboBoxField, DateField, MoneyField, TextField} from "../../../../components/FormComponents/Fields"
import {useRouter} from "next/router";
import LoansNavBar from "./_components/LoansNavBar";
import {create} from "../../../../api/loans/crud";
import {getById as getCarById, getUnusedCarsAsOptions} from "../../../../api/cars/crud";
import FieldGroup from "../../../../components/FormComponents/FieldGroup";

const formValidation = Yup.object().shape({
    creditNumber: Yup.string().nullable().trim().length(5, "Length of Credit Number must be 5 characters").required(`Credit Number is required`),
    startDate: Yup.string().nullable().required(`Start Date is required`),
    totalSum: Yup.number().required(`Total Sum is required`),
    carId: Yup.string().required(`Car is required`),
})

const CreateLoan = ({SSCars}) => {
    const router = useRouter()
    const clientId = router.query.clientId

    const [currentCar, setCurrentCar] = useState({
        brand: ``,
        model: ``,
        number: ``,
        price: ``,
    })

    const formik = useFormik({
        initialValues: {
            creditNumber: ``,
            startDate: ``,
            totalSum: ``,
            carId: ``,
        },
        validationSchema: formValidation,
        onSubmit: () => {
            console.log(formik.values)
            create(clientId, formik.values).then(r => {
                    router.push({
                        pathname: `/clients/${clientId}/loans/view/${r.id}`,
                    })
                }
            )
        },
    })

    return (
        <MainLayout title={`Edit Loan`}>
            <LoansNavBar id={clientId}/>

            <FormBody
                submitEnabled
                searchEnabled
                createEnabled

                onSearch={() => router.push({
                    pathname: `/clients/${clientId}/loans/search`
                })}

                onCreate={() => router.push({
                    pathname: `/clients/${clientId}/loans/create`
                })}

                onSubmit={formik.handleSubmit}

            >
                <TextField
                    label={`Credit Number`}
                    name={`creditNumber`}
                    placeholder={'Input Name'}
                    value={formik.values.creditNumber}
                    handleChange={formik.handleChange}
                    handleBlur={formik.handleBlur}
                    error={formik.errors.creditNumber}
                />

                <DateField
                    label={`Start Date`}
                    name={`startDate`}
                    inputFormat={`dd/MM/yyyy`}
                    value={formik.values.startDate}
                    handleChange={formik.setFieldValue}
                    handleBlur={formik.handleBlur}
                    error={formik.errors.startDate}
                />

                <MoneyField
                    label={`Total Sum`}
                    name={`totalSum`}
                    placeholder={'₽ 0.00'}
                    value={formik.values.totalSum}
                    handleChange={formik.handleChange}
                    handleBlur={formik.handleBlur}
                    error={formik.errors.totalSum}
                />

                <ComboBoxField
                    label={`Car`}
                    name={`carId`}
                    placeholder={`Choose Car`}
                    value={formik.values.carId}
                    options={SSCars}
                    handleChange={formik.setFieldValue}
                    handleBlur={formik.handleBlur}
                    error={formik.errors.carId}
                    onChangeEvent={(newValue) => {
                        if (newValue.key) {
                            getCarById(clientId, newValue.key).then(car => {
                                setCurrentCar(car)
                            })
                        } else {
                            setCurrentCar({
                                brand: ``,
                                model: ``,
                                number: ``,
                                price: ``,
                            })
                        }
                    }}
                />

                <FieldGroup label={`Car Values`}>
                    <TextField
                        width={20}
                        label={`Brand`}
                        name={`brand`}
                        value={currentCar.brand}
                    />

                    <TextField
                        width={20}
                        label={`Model`}
                        name={`model`}
                        value={currentCar.model}
                    />

                    <TextField
                        width={20}
                        label={`Number`}
                        name={`number`}
                        value={currentCar.number}
                    />

                    <TextField
                        width={20}
                        label={`Price`}
                        name={`price`}
                        value={`₽ ${currentCar.price}`}
                    />
                </FieldGroup>
            </FormBody>
        </MainLayout>
    )
}

export const getServerSideProps = async ({query}) => {
    const cars = await getUnusedCarsAsOptions(query.clientId,)

    return {
        props: {
            SSCars: cars,
        }
    }
}


export default CreateLoan
