import {useFormik} from "formik";
import * as Yup from "yup";
import {MainLayout} from "../../../components/MainLayout";
import {useEffect, useState} from "react";

import {FormBody} from "../../../components/FormComponents/FormBody"
import {ComboBoxField, DateField, TextField} from "../../../components/FormComponents/Fields"
import {getNationality} from "../../../api/clients/getNationality";
import {getById, update} from "../../../api/clients/crud"
import {useRouter} from "next/router";
import ClientsNavBar from "../_components/ClientsNavBar";

const formValidation = Yup.object().shape({
    name: Yup.string().trim().max(30, `Too Long`).min(3, `Too Short`).required(`Name is required`),
    dateOfBirth: Yup.string().nullable().required(`Date of Birth is required`),
    passportNumber: Yup.string().min(10, `Passport number is too short`).required(`Passport Number is required`),
    nationality: Yup.string().required(`Nationality is required`),
})

const CreateClient = ({SSClient}) => {
    const router = useRouter()
    const id = router.query.id

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
            name: SSClient.name,
            dateOfBirth: SSClient.dateOfBirth,
            passportNumber: SSClient.passportNumber,
            nationality: SSClient.nationality,
        },
        validationSchema: formValidation,
        onSubmit: () => {
            console.log(formik.values)

            update(id, formik.values).then(_ => {
                    router.push({
                        pathname: `/clients/view/${id}`,
                    })
                }
            )
        }
    })

    return (
        <MainLayout title={`Edit Client`}>
            <ClientsNavBar id={id} />

            <FormBody
                submitEnabled
                searchEnabled
                createEnabled

                onSearch={() => router.push({
                    pathname: `/clients/search`
                })}

                onCreate={() => router.push({
                    pathname: `/clients/create`
                })}

                onSubmit={formik.handleSubmit}

            >
                <TextField
                    width={20}
                    label={`Name`}
                    name={`name`}
                    placeholder={'Input Name'}
                    value={formik.values.name}
                    handleChange={formik.handleChange}
                    handleBlur={formik.handleBlur}
                    error={formik.errors.name}
                />

                <DateField
                    label={`Date Of Birth`}
                    name={`dateOfBirth`}
                    inputFormat={`dd/MM/yyyy`}
                    value={formik.values.dateOfBirth}
                    handleChange={formik.setFieldValue}
                    handleBlur={formik.handleBlur}
                    error={formik.errors.dateOfBirth}
                />

                <TextField
                    width={20}
                    label={`Passport Number`}
                    name={`passportNumber`}
                    placeholder={'Input Passport Number'}
                    value={formik.values.passportNumber}
                    handleChange={formik.handleChange}
                    handleBlur={formik.handleBlur}
                    error={formik.errors.passportNumber}
                />

                <ComboBoxField
                    label={`Nationality`}
                    name={`nationality`}
                    placeholder={`Choose Nationality`}
                    value={formik.values.nationality}
                    options={options}
                    handleChange={formik.setFieldValue}
                    handleBlur={formik.handleBlur}
                    error={formik.errors.nationality}
                />
            </FormBody>
        </MainLayout>
    )
}

export const getServerSideProps = async ({query}) => {
    const client = await getById(query.id)

    return {
        props: {
            SSClient: client,
        }
    }
}

export default CreateClient
