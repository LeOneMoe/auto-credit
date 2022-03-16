import {MainLayout} from "../../../../../components/MainLayout";
import {deleteById, getById} from "../../../../../api/loans/crud";
import {FormBody} from "../../../../../components/FormComponents/FormBody";
import {TextField} from "../../../../../components/FormComponents/Fields/TextField";
import {useRouter} from "next/router";
import LoansNavBar from "../_components/LoansNavBar";
import {getById as getCarById} from "../../../../../api/cars/crud";
import FieldGroup from "../../../../../components/FormComponents/FieldGroup";
import {MoneyField} from "../../../../../components/FormComponents/Fields";
import {toIsoString} from "../../../../../util/DateUtil";

const ViewLoan = ({SSLoan, SSCar}) => {
    const router = useRouter()
    const clientId = router.query.clientId
    const loanId = router.query.id

    return (
        <MainLayout title={`View Client`}>
            <LoansNavBar id={clientId}/>

            <FormBody
                createEnabled
                editEnabled
                searchEnabled
                deleteEnabled

                onCreate={() => router.push({
                    pathname: `/clients/${clientId}/loans/create`
                })}

                onEdit={() => router.push({
                    pathname: `/clients/${clientId}/loans/edit/${loanId}`
                })}

                onSearch={() => router.push({
                    pathname: `/clients/${clientId}/loans/search`
                })}

                onDelete={() =>
                    deleteById(loanId).then(_ =>
                        router.push({
                            pathname: `/clients/${clientId}/loans`
                        })
                    )
                }
            >
                <TextField
                    label={`Credit Number`}
                    value={SSLoan.creditNumber}
                />

                <TextField
                    label={`Start Date`}
                    value={toIsoString(SSLoan.startDate)}
                />

                <MoneyField
                    label={`Total Sum`}
                    value={SSLoan.totalSum}
                    readOnly
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
    const loan = await getById(query.clientId, query.id)
    const car = await getCarById(query.clientId, loan.carId)

    return {
        props: {
            SSLoan: loan,
            SSCar: car,
        }
    }
}

export default ViewLoan
