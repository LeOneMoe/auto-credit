import classes from "../TableComponents/Table.module.css";

const TableHead = ({children}) => {
    return (
        <div className={classes.heading}>
            {children}
        </div>
    )
}

export default TableHead
