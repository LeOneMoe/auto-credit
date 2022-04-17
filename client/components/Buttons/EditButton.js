import {IconButton} from "@mui/material";
import {useEffect, useState} from "react";
import {getSession} from "next-auth/react";
import RoleDialog from "../PopUp/RoleDialog";
import EditIcon from "@mui/icons-material/Edit";

const EditButton = ({disabled = false, onClick, onDeleteRole: onEditRole}) => {
    const [hasRole, setHasRole] = useState(false)

    useEffect(() => {
        getSession().then(async session => {
            setHasRole(session.roles.includes(onEditRole))
        })
    }, [])

    const [errorOpen, setErrorOpen] = useState(false);

    const handleClickOpen = () => {
        if (!hasRole) {
            setErrorOpen(true)
        } else (
            onClick()
        )
    }

    const handleClose = () => {
        setErrorOpen(false)
    }

    const handleConfirm = () => {
        setErrorOpen(false)
    }

    return (
        <>
            <IconButton
                onClick={handleClickOpen}
                disabled={disabled}
            >
                <EditIcon/>
            </IconButton>

            <RoleDialog
                isOpen={errorOpen}
                onClose={handleClose}
                onConfirm={handleConfirm}
                title={`You don't have required role to perform this action.`}
            />
        </>
    )
}

export default EditButton
