import classes from "./ToolBar.module.css";
import {IconButton} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SaveIcon from "@mui/icons-material/Save";
import AddIcon from "@mui/icons-material/Add";

const ToolBarBody = ({children}) => {
    return (
        <div className={classes.toolBar}>
            {children}

            <IconButton type={`submit`}>
                <SearchIcon/>
            </IconButton>

            <IconButton>
                <SaveIcon/>
            </IconButton>

            <IconButton>
                <AddIcon/>
            </IconButton>
        </div>
    )
}

export default ToolBarBody
