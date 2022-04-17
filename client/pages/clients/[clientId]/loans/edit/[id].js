import {useFormik} from "formik";
import * as Yup from "yup";
import {MainLayout} from "../../../../../components/Layouts/MainLayout";
import {useState} from "react";

import {FormBody} from "../../../../../components/FormComponents/FormBody"
import {ComboBoxField, DateField, MoneyField, TextField} from "../../../../../components/FormComponents/Fields"
import {getById, update} from "../../../../../api/loans/crud"
import {getById as getCarById, getUnusedCarsAsOptions} from "../../../../../api/cars/crud"
import {useRouter} from "next/router";
import LoansNavBar from "../_components/LoansNavBar";
import FieldGroup from "../../../../../components/FormComponents/FieldGroup";
import {getSession} from "next-auth/react";

const formValidation = Yup.object().shape({
    creditNumber: Yup.string().nullable().trim().length(5, "Length of Credit Number must be 5 characters").required(`Credit Number is required`),
    startDate: Yup.string().nullable().required(`Start Date is required`),
    totalSum: Yup.number().required(`Total Sum is required`),
    carId: Yup.string().required(`Car is required`),
})

const CreateLoan = ({SSLoan, SSCar, SSCars}) => {
    const router = useRouter()
    const clientId = router.query.clientId
    const loanId = router.query.id

    const [currentCar, setCurrentCar] = useState(SSCar)

    const formik = useFormik({
        initialValues: {
            creditNumber: SSLoan.creditNumber,
            startDate: SSLoan.startDate,
            totalSum: SSLoan.totalSum,
            carId: SSLoan.carId,

        },
        validationSchema: formValidation,
        onSubmit: () => {
            update(clientId, loanId, formik.values).then(_ => {
                    router.push({
                        pathname: `/clients/${clientId}/loans/view/${loanId}`,
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

export const getServerSideProps = async ({query, req}) => {
    const {roles} = await getSession({req})
    const loan = await getById(query.clientId, query.id)
    const car = await getCarById(query.clientId, loan.carId)
    const cars = await getUnusedCarsAsOptions(query.clientId, car.id)

    if (!roles.includes(`ROLE_ADMIN`)) {
        return {
            redirect: {
                destination: '/roleerror',
                permanent: false,
            },
        }
    }

    return {
        props: {
            SSLoan: loan,
            SSCar: car,
            SSCars: cars,
        }
    }
}

export default CreateLoan
