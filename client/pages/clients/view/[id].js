import {getNationality} from "../../../api/clients/getNationality";
import {MainLayout} from "../../../components/MainLayout";
import {deleteById, getById} from "../../../api/clients/crud";
import {FormBody} from "../../../components/FormComponents/FormBody";
import {TextField} from "../../../components/FormComponents/Fields/TextField";
import {toIsoString} from "../../../util/DateUtil";
import {useRouter} from "next/router";
import ClientsNavBar from "../_components/ClientsNavBar";
import {getOptionLabel} from "../../../util/Options";

const ViewClient = ({SSClient, nationality}) => {
    const router = useRouter()

    const id = router.query.id

    return (
        <MainLayout title={`View Client`}>
            <ClientsNavBar id={id}/>

            <FormBody
                createEnabled
                editEnabled
                searchEnabled
                deleteEnabled

                onCreate={() => router.push({
                    pathname: `/clients/create`
                })}

                onEdit={() => router.push({
                    pathname: `/clients/edit/${id}`
                })}

                onSearch={() => router.push({
                    pathname: `/clients/search`
                })}

                onDelete={() =>
                    deleteById(id).then(_ =>
                        router.push({
                            pathname: `/clients`
                        })
                    )
                }
            >
                <TextField
                    disabled
                    width={20}
                    label={`Name`}
                    value={SSClient.name}
                />

                <TextField
                    disabled
                    width={20}
                    label={`Date Of Birth`}
                    value={toIsoString(SSClient.dateOfBirth)}
                />

                <TextField
                    disabled
                    width={20}
                    label={`Passport Number`}
                    value={SSClient.passportNumber}
                />

                <TextField
                    disabled
                    width={20}
                    label={`Nationality`}
                    value={nationality}
                />
            </FormBody>
        </MainLayout>
    )
}

export const getServerSideProps = async ({query}) => {
    const client = await getById(query.id)

    const options = await getNationality(client.nationality)

    return {
        props: {
            SSClient: client,
            nationality: getOptionLabel(options, client.nationality)
        }
    }
}

export default ViewClient
