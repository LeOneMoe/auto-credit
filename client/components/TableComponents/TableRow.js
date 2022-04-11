import classes from "../TableComponents/Table.module.css";
import Link from "next/link";
import {IconButton} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {useState} from "react";
import DeleteDialog from "../PopUp/DeleteDialog";

const TableRow = ({
                      children,
                      href,
                      as,
                      onEdit,
                      onDelete,
                      disableEdit = false,
                      disableDelete = false
                  }) => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = () => {
        onDelete()
        setOpen(false)
    }

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

                <IconButton
                    onClick={handleClickOpen}
                    disabled={disableDelete}
                >
                    <DeleteIcon/>
                </IconButton>
            </div>

            <DeleteDialog
                isOpen={open}
                onClose={handleClose}
                onConfirm={handleConfirm}
            />

        </div>
    )
}

export default TableRow
