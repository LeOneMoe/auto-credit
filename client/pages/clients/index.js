import {deleteById, getAll} from "../../api/clients/crud";
import {getNationality} from "../../api/clients/getNationality";
import TableHead from "../../components/TableComponents/TableHead";
import TableColumnHeader from "../../components/TableComponents/TableColumnHeader";
import TableBody from "../../components/TableComponents/TableBody";
import TableRow from "../../components/TableComponents/TableRow";
import TableCell from "../../components/TableComponents/TableCell";
import Table from "../../components/TableComponents/Table";
import {MainLayout} from "../../components/MainLayout";
import {toIsoString} from "../../util/DateUtil";
import {useRouter} from "next/router";
import {getOptionLabel} from "../../util/Options";

const ListClients = ({SSClients, options}) => {
    const router = useRouter();

    return (
        <MainLayout title={`Clients`}>
            <Table>
                <TableHead>
                    <TableColumnHeader>Name</TableColumnHeader>
                    <TableColumnHeader>Date Of Birth</TableColumnHeader>
                    <TableColumnHeader>Passport Number</TableColumnHeader>
                    <TableColumnHeader>Nationality</TableColumnHeader>
                </TableHead>

                <TableBody>
                    {SSClients.map(client =>
                        <TableRow
                            key={client.id}
                            href={`/clients/view/[id]`}
                            as={`/clients/view/${client.id}`}
                            onEdit={() =>
                                router.push({
                                    pathname: `/clients/edit/${client.id}`
                                })
                            }
                            onDelete={() => {
                                deleteById(client.id).then(_ => router.reload())
                            }}
                        >
                            <TableCell>{client.name}</TableCell>
                            <TableCell>{toIsoString(client.dateOfBirth)}</TableCell>
                            <TableCell>{client.passportNumber}</TableCell>
                            <TableCell>{getOptionLabel(options, client.nationality)}</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </MainLayout>
    )
}

export const getServerSideProps = async ({query}) => {
    const clients = await getAll({query})

    const options = await getNationality()

    return {
        props: {
            SSClients: clients,
            options: options
        }
    }
}

export default ListClients
