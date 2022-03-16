import ModulePanel from "../../../components/ModuleNavigation/ModulePanel";
import NavigationBar from "../../../components/ModuleNavigation/NavigationBar";

const ClientsNavBar = ({
                           id,
                           childPanelsEnabled = true
                       }) => {
    return (
        <NavigationBar>
            <ModulePanel name={`Clients`} href={`/clients`} as={`/clients`} isCurrent/>
            {childPanelsEnabled &&
                <>
                    <ModulePanel name={`Loans`} href={`/clients/[clientId]/loans/`} as={`/clients/${id}/loans/`}/>
                    <ModulePanel name={`Cars`} href={`/clients/[clientId]/cars/`} as={`/clients/${id}/cars/`}/>
                </>
            }
        </NavigationBar>
    )
}

export default ClientsNavBar
