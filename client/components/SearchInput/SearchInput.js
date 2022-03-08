import {SearchRounded} from "@mui/icons-material";
import classes from "./SearchInput.module.css"

const SearchInput = ({...rest}) => {
    return (
        <div className={classes.wrapper}>
            <SearchRounded color="inherit"/>
            <input className={classes.input} {...rest}/>
        </div>
    )
}

export default SearchInput