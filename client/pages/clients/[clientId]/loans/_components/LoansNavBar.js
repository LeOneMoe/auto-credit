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

            {/*{childPanelsEnabled &&*/}
            {/*    <ModulePanel name={`Clients View ${id}`} href={`/clients/view/[id]`} as={`/clients/view/${id}`}/>*/}
            {/*}*/}
        </NavigationBar>
    )
}

export default LoansNavBar
