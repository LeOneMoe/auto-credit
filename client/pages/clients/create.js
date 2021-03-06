import {useFormik} from "formik";
import * as Yup from "yup";
import {MainLayout} from "../../components/Layouts/MainLayout";

import {FormBody} from "../../components/FormComponents/FormBody"
import {ComboBoxField, DateField, TextField} from "../../components/FormComponents/Fields"
import {getNationality} from "../../api/clients/getNationality";
import {create} from "../../api/clients/crud"
import {useRouter} from "next/router";
import ClientsNavBar from "./_components/ClientsNavBar";
import {getSession} from "next-auth/react";

const formValidation = Yup.object().shape({
    name: Yup.string().trim().min(5, `Too Short`).required(`Name is required`),
    dateOfBirth: Yup.string().nullable().required(`Date of Birth is required`),
    passportNumber: Yup.string().length(10, `Passport number must be 10 symbols`).required(`Passport Number is required`),
    nationality: Yup.string().required(`Nationality is required`),
})

const CreateClient = ({SSOptions}) => {
    const router = useRouter()

    const formik = useFormik({
        initialValues: {
            name: ``,
            dateOfBirth: ``,
            passportNumber: ``,
            nationality: ``,
        },
        validationSchema: formValidation,
        onSubmit: () => {
            create(formik.values).then(r =>
                router.push({
                    pathname: `/clients/view/${r.id}`,
                })
            )
        }
    })

    return (
        <MainLayout title={`Search Posts`}>
            <ClientsNavBar childPanelsEnabled={false}/>

            <FormBody
                searchEnabled
                submitEnabled

                onCreate={() => router.push({
                    pathname: `/clients/create`
                })}

                onSearch={() => router.push({
                    pathname: `/clients/search`
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
                    options={SSOptions}
                    handleChange={formik.setFieldValue}
                    handleBlur={formik.handleBlur}
                    error={formik.errors.nationality}
                />
            </FormBody>
        </MainLayout>
    )
}

export const getServerSideProps = async ({query, req}) => {
    const {roles} = await getSession({req})
    const options = await getNationality()

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
            SSOptions: options,
        }
    }
}

export default CreateClient
