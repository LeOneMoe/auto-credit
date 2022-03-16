import {MainLayout} from "../../../../../components/MainLayout";
import {deleteById, getById} from "../../../../../api/cars/crud";
import {FormBody} from "../../../../../components/FormComponents/FormBody";
import {TextField} from "../../../../../components/FormComponents/Fields/TextField";
import {useRouter} from "next/router";
import CarsNavBar from "../_components/CarsNavBar";
import {toIsoString} from "../../../../../util/DateUtil";

const ViewCar = ({SSCar}) => {
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
                    pathname: `/clients/${clientId}/cars/edit/${carId}`
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

                <TextField
                    width={20}
                    label={`Date Of Purchase`}
                    value={toIsoString(SSCar.dateOfPurchase)}
                />
            </FormBody>
        </MainLayout>
    )
}

export const getServerSideProps = async ({query}) => {
    const car = await getById(query.clientId, query.id)

    return {
        props: {
            SSCar: car,
        }
    }
}

export default ViewCar
