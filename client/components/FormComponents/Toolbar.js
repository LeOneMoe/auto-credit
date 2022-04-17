import {IconButton} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import DeleteButton from "../Buttons/DeleteButton";

const Toolbar = ({
                     onEdit,
                     onSearch,
                     onDelete,
                     onCreate,
                     searchEnabled = false,
                     createEnabled = false,
                     editEnabled = false,
                     deleteEnabled = false,
                     submitEnabled = false,
                     isSearchMode = false,
                     onDeleteRole,
                 }) => {

    const handleKeydown = (e) => {
        if (e.keyCode === 13) {
            // enter
        }
    }

    return (
        <div>
            {isSearchMode ?
                <IconButton type={`submit`}>
                    <SearchIcon/>
                </IconButton>
                :
                <IconButton disabled={!searchEnabled} onClick={onSearch}>
                    <SearchIcon/>
                </IconButton>
            }

            <IconButton disabled={!createEnabled} onClick={onCreate}>
                <AddIcon/>
            </IconButton>

            <IconButton disabled={!submitEnabled} type={`submit`} onKeyDown={handleKeydown}>
                <SaveIcon/>
            </IconButton>

            <IconButton disabled={!editEnabled} onClick={onEdit}>
                <EditIcon/>
            </IconButton>

            <DeleteButton disabled={!deleteEnabled} onClick={onDelete} onDeleteRole={onDeleteRole}/>
        </div>
    )
}

export default Toolbar
