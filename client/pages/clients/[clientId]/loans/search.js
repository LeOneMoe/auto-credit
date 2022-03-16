import {useFormik} from "formik";
import * as Yup from "yup";
import {MainLayout} from "../../../../components/MainLayout";

import {FormBody} from "../../../../components/FormComponents/FormBody"
import {ComboBoxField, TextField} from "../../../../components/FormComponents/Fields"
import {useRouter} from "next/router";
import LoansNavBar from "./_components/LoansNavBar";
import {getAllCarsAsOptions, getById as getCarById} from "../../../../api/cars/crud";
import FieldGroup from "../../../../components/FormComponents/FieldGroup";
import {useState} from "react";

const formValidation = Yup.object().shape({
    creditNumber: Yup.string().nullable().trim(),
    carId: Yup.string(),
})

const FindLoans = ({SSCars}) => {
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
            carId: ``,
        },
        validationSchema: formValidation,
        onSubmit: () => {
            router.push({
                pathname: `/clients/${clientId}/loans`,
                query: formik.values
            })
        }
    })

    return (
        <MainLayout title={`Search Posts`}>
            <LoansNavBar childPanelsEnabled={false} id={clientId}/>

            <FormBody
                isSearchMode

                createEnabled

                onCreate={() => router.push({
                    pathname: `/clients/create`
                })}

                onSubmit={formik.handleSubmit}
            >
                <TextField
                    label={`Credit Number`}
                    name={`creditNumber`}
                    placeholder={'Input Credit Number'}
                    value={formik.values.creditNumber}
                    handleChange={formik.handleChange}
                    handleBlur={formik.handleBlur}
                    error={formik.errors.creditNumber}
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
    const cars = await getAllCarsAsOptions(query.clientId)

    return {
        props: {
            SSCars: cars,
        }
    }
}

export default FindLoans
