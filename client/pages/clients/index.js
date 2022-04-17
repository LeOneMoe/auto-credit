import {deleteById, getAll} from "../../api/clients/crud";
import {getNationality} from "../../api/clients/getNationality";
import TableHead from "../../components/TableComponents/TableHead";
import TableColumnHeader from "../../components/TableComponents/TableColumnHeader";
import TableBody from "../../components/TableComponents/TableBody";
import TableRow from "../../components/TableComponents/TableRow";
import TableCell from "../../components/TableComponents/TableCell";
import Table from "../../components/TableComponents/Table";
import {MainLayout} from "../../components/Layouts/MainLayout";
import {toIsoString} from "../../util/DateUtil";
import {useRouter} from "next/router";
import {getOptionLabel} from "../../util/Options";
import ClientsNavBar from "./_components/ClientsNavBar";
import Toolbar from "../../components/FormComponents/Toolbar";
import {getSession} from "next-auth/react";

const ListClients = ({SSClients, options}) => {
    const router = useRouter();

    return (
        <MainLayout title={`Clients`}>
            <ClientsNavBar childPanelsEnabled={false}/>

            <Toolbar
                searchEnabled
                createEnabled
                onSearch={() => router.push(`/clients/search`)}
                onCreate={() => router.push(`/clients/create`)}
                onDeleteRole={`ROLE_ADMIN`}
            />

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
                            onEditRole={`ROLE_ADMIN`}
                            onDelete={() => {
                                deleteById(client.id).then(_ => router.reload())
                            }}
                            onDeleteRole={`ROLE_ADMIN`}
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

export const getServerSideProps = async ({query, req}) => {
    const {roles} = await getSession({req})

    const clients = await getAll(query)

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
            SSClients: clients,
            options: options
        }
    }
}

export default ListClients
