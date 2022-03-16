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

const ListLoans = ({SSLoans}) => {
    const router = useRouter();

    const clientId = router.query.clientId

    return (
        <MainLayout title={`Loans`}>
            <LoansNavBar childPanelsEnabled={false} id={clientId}/>

            <Toolbar
                searchEnabled
                createEnabled
                onSearch={() => router.push(`/clients/${clientId}/loans/search`)}
                onCreate={() => router.push(`/clients/${clientId}/loans/create`)}
            />

            <Table>
                <TableHead>
                    <TableColumnHeader>Credit Number</TableColumnHeader>
                    <TableColumnHeader>Start Date</TableColumnHeader>
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
                                deleteById(clientId, loan.id).then(_ => router.reload())
                            }}
                        >
                            <TableCell>{loan.creditNumber}</TableCell>
                            <TableCell>{toIsoString(loan.startDate)}</TableCell>
                            <TableCell>₽ {loan.totalSum}</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </MainLayout>
    )
}

export const getServerSideProps = async ({query}) => {
    const loans = await getAll(query.clientId, query)

    return {
        props: {
            SSLoans: loans,
        }
    }
}

export default ListLoans
