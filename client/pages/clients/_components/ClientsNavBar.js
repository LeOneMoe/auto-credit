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
                <ModulePanel name={`Clients View ${id}`} href={`/clients/view/[id]`} as={`/clients/view/${id}`}/>
            }
        </NavigationBar>
    )
}

export default ClientsNavBar
