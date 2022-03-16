import ModulePanel from "../../../../../components/ModuleNavigation/ModulePanel";
import NavigationBar from "../../../../../components/ModuleNavigation/NavigationBar";

const LoansNavBar = ({
                         id,
                         childPanelsEnabled = true
                     }) => {
    return (
        <NavigationBar>
            <ModulePanel name={`Clients`} href={`/clients`} as={`/clients`}/>
            <ModulePanel name={`Loans`} href={`/clients/[clientId]/loans/`} as={`/clients/${id}/loans/`} isCurrent/>
            <ModulePanel name={`Cars`} href={`/clients/[clientId]/cars/`} as={`/clients/${id}/cars/`}/>

        </NavigationBar>
    )
}

export default LoansNavBar
