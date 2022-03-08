import {getNationality} from "../../../api/clients/getNationality";
import {MainLayout} from "../../../components/MainLayout";
import {getById} from "../../../api/clients/crud";
import {FormBody} from "../../../components/FormComponents/FormBody";
import {TextField} from "../../../components/FormComponents/Fields/TextField";
import {toIsoString} from "../../../util/DateUtil";

const ViewClient = ({SSClient, option}) => {
    return (
        <MainLayout title={`View Client`}>
            <FormBody>
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
