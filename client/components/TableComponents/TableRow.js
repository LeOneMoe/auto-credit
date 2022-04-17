import classes from "../TableComponents/Table.module.css";
import Link from "next/link";
import {IconButton} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteButton from "../Buttons/DeleteButton";

const TableRow = ({
                      children,
                      href,
                      as,
                      onEdit,
                      onDelete,
                      disableEdit = false,
                      disableDelete = false,
                      onDeleteRole,
                  }) => {
    return (
        <div className={classes.rowPanel}>

            <Link href={href} as={as} passHref>
                <div className={classes.row}>
                    {children}
                </div>
            </Link>

            <div className={classes.toolBar}>
                <IconButton onClick={onEdit} disabled={disableEdit}>
                    <EditIcon/>
                </IconButton>

                <DeleteButton
                    onClick={onDelete}
                    disabled={disableDelete}
                    onDeleteRole={onDeleteRole}
                />
            </div>
        </div>
    )
}

export default TableRow
