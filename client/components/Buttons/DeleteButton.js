import DeleteIcon from "@mui/icons-material/Delete";
import {IconButton} from "@mui/material";
import DeleteDialog from "../PopUp/DeleteDialog";
import {useEffect, useState} from "react";
import {getSession} from "next-auth/react";
import RoleDialog from "../PopUp/RoleDialog";

const DeleteButton = ({disabled = false, onClick, onDeleteRole}) => {
    const [hasRole, setHasRole] = useState(false)

    useEffect(() => {
        getSession().then(async session => {
            setHasRole(session.roles.includes(onDeleteRole))
        })
    }, [])

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [errorOpen, setErrorOpen] = useState(false);

    const handleClickOpen = () => {
        if (hasRole) {
            setConfirmOpen(true);
        } else {
            setErrorOpen(true)
        }
    };

    const handleClose = () => {
        if (hasRole) {
            setConfirmOpen(false);
        } else {
            setErrorOpen(false)
        }
    };

    const handleConfirm = () => {
        if (hasRole) {
            onClick()
            setConfirmOpen(false)
        } else {
            setErrorOpen(false)
        }
    }

    return (
        <>
            <IconButton
                onClick={handleClickOpen}
                disabled={disabled}

            >
                <DeleteIcon/>
            </IconButton>

            <DeleteDialog
                isOpen={confirmOpen}
                onClose={handleClose}
                onConfirm={handleConfirm}
                title={`Do you want to delete this user?`}
                content={`This action can't be undone.`}
            />
            <RoleDialog
                isOpen={errorOpen}
                onClose={handleClose}
                onConfirm={handleConfirm}
                title={`You don't have required role to perform this action.`}
            />
        </>
    )
}

export default DeleteButton
