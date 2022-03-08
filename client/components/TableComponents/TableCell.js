import classes from "../TableComponents/Table.module.css";

const TableCell = ({children}) => {
    return (
        <div className={classes.cell}>
            {children}
        </div>
    )
}

export default TableCell
