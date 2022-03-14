import {deleteById, getAll} from "../../../../api/loans/crud";
import {getNationality} from "../../../../api/clients/getNationality";
import TableHead from "../../../../components/TableComponents/TableHead";
import TableColumnHeader from "../../../../components/TableComponents/TableColumnHeader";
import TableBody from "../../../../components/TableComponents/TableBody";
import TableRow from "../../../../components/TableComponents/TableRow";
import TableCell from "../../../../components/TableComponents/TableCell";
import Table from "../../../../components/TableComponents/Table";
import {MainLayout} from "../../../../components/MainLayout";
import {toIsoString} from "../../../../util/DateUtil";
import {useRouter} from "next/router";
import {getOptionLabel} from "../../../../util/Options";
import LoansNavBar from "./_components/LoansNavBar";
import Toolbar from "../../../../components/FormComponents/Toolbar";

const ListLoans = ({SSLoans, options}) => {
    const router = useRouter();

    const clientId = router.query.clientId

    return (
        <MainLayout title={`Loans`}>
            <LoansNavBar childPanelsEnabled={false} id={clientId}/>

            <Toolbar
                searchEnabled
                createEnabled
                onSearch={() => router.push(`/clients/search`)}
                onCreate={() => router.push(`/clients/create`)}
            />

            <Table>
                <TableHead>
                    <TableColumnHeader>Brand</TableColumnHeader>
                    <TableColumnHeader>Model</TableColumnHeader>
                    <TableColumnHeader>Number</TableColumnHeader>
                    <TableColumnHeader>Purchase Date</TableColumnHeader>
                    <TableColumnHeader>Total Sum</TableColumnHeader>
                </TableHead>

                <TableBody>
                    {SSLoans.map(loan =>
                        <TableRow
                            key={loan.id}
                            href={`/clients/[clientId]/loans/view/[loanId]`}
                            as={`/clients/${clientId}/loans/view/${loan.id}`}
                            onEdit={() =>
                                router.push({
                                    pathname: `/clients/${clientId}/loans/edit/${loan.id}`
                                })
                            }
                            onDelete={() => {
                                deleteById(loan.id).then(_ => router.reload())
                            }}
                        >
                            <TableCell>{loan.car.brand}</TableCell>
                            <TableCell>{loan.car.model}</TableCell>
                            <TableCell>{loan.car.number}</TableCell>
                            <TableCell>{toIsoString(loan.car.dateOfPurchase)}</TableCell>
                            <TableCell>$ {loan.totalSum}</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </MainLayout>
    )
}

export const getServerSideProps = async ({query}) => {
    const loans = await getAll(query.clientId, query)

    const options = await getNationality()

    return {
        props: {
            SSLoans: loans,
            options: options
        }
    }
}

export default ListLoans
