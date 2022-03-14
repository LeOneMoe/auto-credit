import {useFormik} from "formik";
import * as Yup from "yup";
import {MainLayout} from "../../../../../components/MainLayout";
import {useEffect, useState} from "react";

import {FormBody} from "../../../../../components/FormComponents/FormBody"
import {ComboBoxField, DateField, MoneyField, TextField} from "../../../../../components/FormComponents/Fields"
import {getNationality} from "../../../../../api/clients/getNationality";
import {getById, update} from "../../../../../api/loans/crud"
import {getById as getCarById, getCarsAsOptions} from "../../../../../api/cars/crud"
import {useRouter} from "next/router";
import LoansNavBar from "../_components/LoansNavBar";
import FieldGroup from "../../../../../components/FormComponents/FieldGroup";

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
    const [options, setOptions] = useState([])

    useEffect(() => {
        async function loadOptions() {
            const options = await getNationality()
            setOptions(options)
            console.log(options)
        }

        if (options.length === 0) {
            loadOptions()
        }
    })

    const formik = useFormik({
        initialValues: {
            creditNumber: SSLoan.creditNumber,
            startDate: SSLoan.startDate,
            totalSum: SSLoan.totalSum,
            carId: SSLoan.carId,
            brand: SSCar.brand,
            model: SSCar.model,
            number: SSCar.number,
            price: `₽ ${SSCar.price}`,
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
            <LoansNavBar id={loanId}/>

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
                    width={20}
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
                        label={`Credit Number`}
                        name={`creditNumber`}
                        value={currentCar.model}
                    />

                    <TextField
                        width={20}
                        label={`Credit Number`}
                        name={`creditNumber`}
                        value={currentCar.number}
                    />

                    <TextField
                        width={20}
                        label={`Credit Number`}
                        name={`creditNumber`}
                        value={currentCar.price}
                    />
                </FieldGroup>
            </FormBody>
        </MainLayout>
    )
}

export const getServerSideProps = async ({query}) => {
    const loan = await getById(query.clientId, query.id)
    const car = await getCarById(query.clientId, loan.carId)
    const cars = await getCarsAsOptions(query.clientId)

    return {
        props: {
            SSLoan: loan,
            SSCar: car,
            SSCars: cars,
        }
    }
}

export default CreateLoan
