import {MainLayout} from "../../../../../components/MainLayout";
import {deleteById, getById} from "../../../../../api/loans/crud";
import {FormBody} from "../../../../../components/FormComponents/FormBody";
import {TextField} from "../../../../../components/FormComponents/Fields/TextField";
import {toIsoString} from "../../../../../util/DateUtil";
import {useRouter} from "next/router";
import LoansNavBar from "../_components/LoansNavBar";

const ViewLoan = ({SSLoan}) => {
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
                    pathname: `/clients/${clientId}/loans/edit/${clientId}`
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
                    disabled
                    width={20}
                    label={`Name`}
                    value={SSLoan.car.brand}
                />

                <TextField
                    disabled
                    width={20}
                    label={`Date Of Birth`}
                    value={SSLoan.car.model}
                />

                <TextField
                    disabled
                    width={20}
                    label={`Passport Number`}
                    value={SSLoan.car.number}
                />

                <TextField
                    disabled
                    width={20}
                    label={`Nationality`}
                    value={toIsoString(SSLoan.car.dateOfPurchase)}
                />

                <TextField
                    disabled
                    width={20}
                    label={`Nationality`}
                    value={`₽ ${SSLoan.totalSum}`}
                />
            </FormBody>
        </MainLayout>
    )
}

export const getServerSideProps = async ({query}) => {
    const loan = await getById(query.clientId, query.id)

    return {
        props: {
            SSLoan: loan,
        }
    }
}

export default ViewLoan
