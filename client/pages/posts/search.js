import {useFormik} from "formik";
import * as Yup from "yup";
import {MainLayout} from "../../components/MainLayout";
import {FormBody} from "../../components/FormComponents/FormBody"
import {TextField} from "../../components/FormComponents/Fields/TextField";
import {ComboBoxField} from "../../components/FormComponents/Fields/ComboBoxField";
import {NumberField} from "../../components/FormComponents/Fields/NumberField";
import {useEffect, useState} from "react";
import {getOptions} from "../../api/options/getOptions";
import {DateField} from "../../components/FormComponents/Fields/DateField";
import {MoneyField} from "../../components/FormComponents/Fields/MoneyField";

const formValidation = Yup.object().shape({
    title: Yup.string().trim().max(30, `Too Long`).min(3, `Too Short`).required(`Title is required`),
    number: Yup.number().required(`Number is required`),
    date: Yup.string().required(`Date is required`).nullable(),
    color: Yup.string().required(`Color is required`),
    money: Yup.number().min(0, `Cannot be negative`).required(`Money is required`),
})

const SearchPosts = () => {
    const [options, setOptions] = useState([])

    useEffect(() => {
        async function loadOptions() {
            const options = await getOptions()
            setOptions(options)
        }

        if (options.length === 0) {
            loadOptions()
        }
    })

    const formik = useFormik({
        initialValues: {
            title: `123`,
            money: ``,
            date: ``,
            number: ``,
            color: ``,
        },
        validationSchema: formValidation,
        onSubmit: () => {
            // router.push({
            //     pathname: `/posts`,
            //     query: formik.values
            // })
        }
    })

    return (
        <MainLayout title={`Search Posts`}>
            <FormBody
                onSubmit={formik.handleSubmit}
                buttonLabel={`Search`}
            >
                <TextField
                    disabled

                    width={20}
                    label={`Very Big Enormous Large Title`}
                    name={`title`}
                    placeholder={'Input Some Text'}
                    value={formik.values.title}
                    handleChange={formik.handleChange}
                    handleBlur={formik.handleBlur}
                    error={formik.errors.title}
                />

                <NumberField
                    disabled

                    label={`Some Number`}
                    name={`number`}
                    placeholder={'Input Some Number'}
                    value={formik.values.number}
                    handleChange={formik.handleChange}
                    handleBlur={formik.handleBlur}
                    error={formik.errors.number}
                />

                <DateField
                    disabled

                    label={`Some Date`}
                    name={`date`}
                    inputFormat={`dd/MM/yyyy`}
                    value={formik.values.date}
                    handleChange={formik.setFieldValue}
                    handleBlur={formik.handleBlur}
                    error={formik.errors.date}
                />

                <ComboBoxField
                    disabled

                    label={`Some ComboBox`}
                    name={`color`}
                    placeholder={`Choose Color`}
                    value={formik.values.color}
                    options={options}
                    handleChange={formik.setFieldValue}
                    handleBlur={formik.handleBlur}
                    error={formik.errors.color}
                />

                <MoneyField
                    disabled

                    label={`Money`}
                    name={`money`}
                    placeholder={'₽ 0.00'}
                    prefix={`₽`}
                    value={formik.values.money}
                    handleChange={formik.handleChange}
                    handleBlur={formik.handleBlur}
                    error={formik.errors.money}
                />

            </FormBody>
        </MainLayout>
    )
}

export default SearchPosts
