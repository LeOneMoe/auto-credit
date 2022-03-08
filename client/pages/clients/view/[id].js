import {getNationality} from "../../../api/clients/getNationality";
import {MainLayout} from "../../../components/MainLayout";
import {deleteById, getById} from "../../../api/clients/crud";
import {FormBody} from "../../../components/FormComponents/FormBody";
import {TextField} from "../../../components/FormComponents/Fields/TextField";
import {toIsoString} from "../../../util/DateUtil";
import {useRouter} from "next/router";

const ViewClient = ({SSClient, option}) => {
    const router = useRouter()

    const id = router.query.id

    return (
        <MainLayout title={`View Client`}>
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
                    value={option}
                />
            </FormBody>
        </MainLayout>
    )
}

export const getServerSideProps = async ({query}) => {
    const client = await getById({id: query.id})

    const options = await getNationality(client.nationality)

    return {
        props: {
            SSClient: client,
            option: options[0].label
        }
    }
}

export default ViewClient
