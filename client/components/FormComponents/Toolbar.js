import {IconButton} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

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

            <IconButton disabled={!deleteEnabled} onClick={onDelete}>
                <DeleteIcon/>
            </IconButton>
        </div>
    )
}

export default Toolbar
