import {useFormik} from "formik";
import * as Yup from "yup";
import {MainLayout} from "../../../../../components/MainLayout";
import {useEffect, useState} from "react";

import {FormBody} from "../../../../../components/FormComponents/FormBody"
import {ComboBoxField, DateField, MoneyField, TextField} from "../../../../../components/FormComponents/Fields"
import {getNationality} from "../../../../../api/clients/getNationality";
import {getById, update} from "../../../../../api/loans/crud"
import {getById as getCarById} from "../../../../../api/cars/crud"
import {useRouter} from "next/router";
import LoansNavBar from "../_components/LoansNavBar";
import FieldGroup from "../../../../../components/FormComponents/FieldGroup";

const formValidation = Yup.object().shape({
    creditNumber: Yup.string().nullable().trim().length(5, "Length of Credit Number must be 5 characters").required(`Credit Number is required`),
    startDate: Yup.string().nullable().required(`Start Date is required`),
    totalSum: Yup.number().required(`Total Sum is required`),
    car: Yup.string().required(`Car is required`),
})

const CreateLoan = ({SSLoan}) => {
    const router = useRouter()
    const clientId = router.query.clientId
    const loanId = router.query.id


    const [options, setOptions] = useState([])

    useEffect(() => {
        async function loadOptions() {
            const options = await getNationality()
            setOptions(options)
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
            car: SSLoan.car.id,
            brand: SSLoan.car.brand,
            model: SSLoan.car.model,
            number: SSLoan.car.number,
            price: `₽ ${SSLoan.car.price}`,
        },
        validationSchema: formValidation,
        onSubmit: () => {
            console.log(formik.values)

            update(clientId, loanId, formik.values).then(_ => {
                    router.push({
                        pathname: `/clients/${clientId}/loans/view/${loanId}`,
                    })
                }
            )
        }
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
                    name={`car`}
                    placeholder={`Choose Car`}
                    value={formik.values.car}
                    options={options}
                    handleChange={formik.setFieldValue}
                    handleBlur={formik.handleBlur}
                    error={formik.errors.car}
                />

                <FieldGroup label={`Car Values`}>
                    <TextField
                        width={20}
                        label={`Credit Number`}
                        name={`creditNumber`}
                        placeholder={'Input Name'}
                        value={formik.values.brand}
                        handleChange={formik.handleChange}
                        handleBlur={formik.handleBlur}
                        error={formik.errors.brand}
                    />

                    <TextField
                        width={20}
                        label={`Credit Number`}
                        name={`creditNumber`}
                        placeholder={'Input Name'}
                        value={formik.values.model}
                        handleChange={formik.handleChange}
                        handleBlur={formik.handleBlur}
                        error={formik.errors.model}
                    />

                    <TextField
                        width={20}
                        label={`Credit Number`}
                        name={`creditNumber`}
                        placeholder={'Input Name'}
                        value={formik.values.number}
                        handleChange={formik.handleChange}
                        handleBlur={formik.handleBlur}
                        error={formik.errors.number}
                    />

                    <TextField
                        width={20}
                        label={`Credit Number`}
                        name={`creditNumber`}
                        placeholder={'Input Name'}
                        value={formik.values.price}
                        handleChange={formik.handleChange}
                        handleBlur={formik.handleBlur}
                        error={formik.errors.price}
                    />
                </FieldGroup>
            </FormBody>
        </MainLayout>
    )
}

export const getServerSideProps = async ({query}) => {
    const loan = await getById(query.clientId, query.id)
    const car = await getCarById(query.clientId, loan.car.id)

    return {
        props: {
            SSLoan: loan,
        }
    }
}

export default CreateLoan
