import {MainLayout} from "../../../../../components/MainLayout";
import {deleteById, getById} from "../../../../../api/cars/crud";
import {FormBody} from "../../../../../components/FormComponents/FormBody";
import {TextField} from "../../../../../components/FormComponents/Fields/TextField";
import {useRouter} from "next/router";
import CarsNavBar from "../_components/CarsNavBar";
import {DateField} from "../../../../../components/FormComponents/Fields/DateField";
import {MoneyField} from "../../../../../components/FormComponents/Fields/MoneyField";
import {ComboBoxField} from "../../../../../components/FormComponents/Fields/ComboBoxField";
import {getById as getCarById} from "../../../../../api/cars/crud";
import FieldGroup from "../../../../../components/FormComponents/FieldGroup";

const ViewCar = ({SSCar, SSCar}) => {
    const router = useRouter()
    const clientId = router.query.clientId
    const carId = router.query.id

    return (
        <MainLayout title={`View Client`}>
            <CarsNavBar id={clientId}/>

            <FormBody
                createEnabled
                editEnabled
                searchEnabled
                deleteEnabled

                onCreate={() => router.push({
                    pathname: `/clients/${clientId}/cars/create`
                })}

                onEdit={() => router.push({
                    pathname: `/clients/${clientId}/cars/edit/${clientId}`
                })}

                onSearch={() => router.push({
                    pathname: `/clients/${clientId}/cars/search`
                })}

                onDelete={() =>
                    deleteById(carId).then(_ =>
                        router.push({
                            pathname: `/clients/${clientId}/cars`
                        })
                    )
                }
            >
                <TextField
                    label={`Credit Number`}
                    value={SSCar.creditNumber}
                />

                <TextField
                    label={`Start Date`}
                    value={SSCar.startDate}
                />

                <TextField
                    label={`Total Sum`}
                    value={SSCar.totalSum}
                />

                <TextField
                    label={`Car`}
                    value={`${SSCar.number} ${SSCar.brand} ${SSCar.model}`}
                />

                <FieldGroup label={`Car Values`}>
                    <TextField
                        width={20}
                        label={`Brand`}
                        value={SSCar.brand}
                    />

                    <TextField
                        width={20}
                        label={`Model`}
                        value={SSCar.model}
                    />

                    <TextField
                        width={20}
                        label={`Number`}
                        value={SSCar.number}
                    />

                    <TextField
                        width={20}
                        label={`Price`}
                        value={`₽ ${SSCar.price}`}
                    />
                </FieldGroup>
            </FormBody>
        </MainLayout>
    )
}

export const getServerSideProps = async ({query}) => {
    const car = await getById(query.clientId, query.id)
    const car = await getCarById(query.clientId, car.carId)

    return {
        props: {
            SSCar: car,
            SSCar: car,
        }
    }
}

export default ViewCar
