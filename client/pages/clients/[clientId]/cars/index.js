import {deleteById, getAll} from "../../../../api/cars/crud";
import {getNationality} from "../../../../api/clients/getNationality";
import TableHead from "../../../../components/TableComponents/TableHead";
import TableColumnHeader from "../../../../components/TableComponents/TableColumnHeader";
import TableBody from "../../../../components/TableComponents/TableBody";
import TableRow from "../../../../components/TableComponents/TableRow";
import TableCell from "../../../../components/TableComponents/TableCell";
import Table from "../../../../components/TableComponents/Table";
import {MainLayout} from "../../../../components/Layouts/MainLayout";
import {toIsoString} from "../../../../util/DateUtil";
import {useRouter} from "next/router";
import CarsNavBar from "./_components/CarsNavBar";
import Toolbar from "../../../../components/FormComponents/Toolbar";
import {getSession} from "next-auth/react";

const ListCars = ({SSCars}) => {
    const router = useRouter();

    const clientId = router.query.clientId

    return (
        <MainLayout title={`Cars`}>
            <CarsNavBar childPanelsEnabled={false} id={clientId}/>

            <Toolbar
                searchEnabled
                createEnabled
                onSearch={() => router.push(`/clients/${clientId}/cars/search`)}
                onCreate={() => router.push(`/clients/${clientId}/cars/create`)}
                onDeleteRole={`ROLE_ADMIN`}
            />

            <Table>
                <TableHead>
                    <TableColumnHeader>Brand</TableColumnHeader>
                    <TableColumnHeader>Model</TableColumnHeader>
                    <TableColumnHeader>Number</TableColumnHeader>
                    <TableColumnHeader>Date of Purchase</TableColumnHeader>
                    <TableColumnHeader>Price</TableColumnHeader>
                </TableHead>

                <TableBody>
                    {SSCars.map(car =>
                        <TableRow
                            key={car.id}
                            href={`/clients/[clientId]/cars/view/[carId]`}
                            as={`/clients/${clientId}/cars/view/${car.id}`}
                            onEdit={() =>
                                router.push({
                                    pathname: `/clients/${clientId}/cars/edit/${car.id}`
                                })
                            }
                            onEditRole={`ROLE_ADMIN`}
                            onDelete={() => {
                                deleteById(car.id).then(_ => router.reload())
                            }}
                            onDeleteRole={`ROLE_ADMIN`}
                        >
                            <TableCell>{car.brand}</TableCell>
                            <TableCell>{car.model}</TableCell>
                            <TableCell>{car.number}</TableCell>
                            <TableCell>{toIsoString(car.dateOfPurchase)}</TableCell>
                            <TableCell>₽ {car.price}</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </MainLayout>
    )
}

export const getServerSideProps = async ({query, req}) => {
    const {roles} = await getSession({req})
    const cars = await getAll(query.clientId, query)

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
            SSCars: cars,
            options: options
        }
    }
}

export default ListCars
