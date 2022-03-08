import classes from "../TableComponents/Table.module.css";

const TableColumnHeader = ({children}) => {
    return (
        <button className={classes.columnHeading}>
            <div>
                {children}
            </div>
        </button>
    )
}

export default TableColumnHeader
