import classes from "./Form.module.css"
import SaveIcon from '@mui/icons-material/Save';
import {IconButton} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';

const FormBody = ({
                      children,
                      onSubmit,
                      onEdit,
                      onSearch,
                      onDelete,
                      onCreate,
                      searchEnabled = false,
                      createEnabled = false,
                      editEnabled = false,
                      deleteEnabled = false,
                      submitEnabled = false,
                  }) => {
    return (
        <form className={classes.form} onSubmit={onSubmit}>
            <div>
                <IconButton disabled={!searchEnabled} onClick={onSearch}>
                    <SearchIcon/>
                </IconButton>

                <IconButton disabled={!createEnabled} onClick={onCreate}>
                    <AddIcon/>
                </IconButton>

                <IconButton disabled={!submitEnabled} type={`submit`}>
                    <SaveIcon/>
                </IconButton>

                <IconButton disabled={!editEnabled} onClick={onEdit}>
                    <EditIcon/>
                </IconButton>

                <IconButton disabled={!deleteEnabled} onClick={onDelete}>
                    <DeleteIcon/>
                </IconButton>
            </div>

            {children}
        </form>
    )
}

export {FormBody}
