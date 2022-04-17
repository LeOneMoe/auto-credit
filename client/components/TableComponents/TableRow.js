import classes from "../TableComponents/Table.module.css";
import Link from "next/link";
import DeleteButton from "../Buttons/DeleteButton";
import EditButton from "../Buttons/EditButton";

const TableRow = ({
                      children,
                      href,
                      as,
                      onEdit,
                      onDelete,
                      disableEdit = false,
                      disableDelete = false,
                      onDeleteRole,
                      onEditRole,
                  }) => {
    return (
        <div className={classes.rowPanel}>

            <Link href={href} as={as} passHref>
                <div className={classes.row}>
                    {children}
                </div>
            </Link>

            <div className={classes.toolBar}>
                <EditButton
                    onClick={onEdit}
                    disabled={disableEdit}
                    onDeleteRole={onEditRole}
                />

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
