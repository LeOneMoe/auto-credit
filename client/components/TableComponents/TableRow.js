import classes from "../TableComponents/Table.module.css";
import Link from "next/link";
import {IconButton} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const TableRow = ({children, href, as, onEdit, onDelete, disableEdit = false, disableDelete = false}) => {
    return (
        <>
            {/*<div className={classes.row}>*/}
            {/*    <Link href={href} as={as} passHref>*/}
            {/*        <div>*/}
            {/*            {children}*/}
            {/*        </div>*/}
            {/*    </Link>*/}

            {/*    <div className={classes.toolBar}>*/}
            {/*        <IconButton onClick={onEdit} disabled={disableEdit}>*/}
            {/*            <EditIcon/>*/}
            {/*        </IconButton>*/}

            {/*        <IconButton onClick={onDelete} disabled={disableDelete}>*/}
            {/*            <DeleteIcon/>*/}
            {/*        </IconButton>*/}
            {/*    </div>*/}
            {/*</div>*/}



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

                    <IconButton onClick={onDelete} disabled={disableDelete}>
                        <DeleteIcon/>
                    </IconButton>
                </div>
            </div>
        </>
    )
}

export default TableRow
