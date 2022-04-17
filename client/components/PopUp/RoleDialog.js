import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

export default function RoleDialog({
                                       isOpen = false,
                                       onConfirm,
                                       onClose,
                                       title
                                   }) {
    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >

            <DialogTitle id="alert-dialog-title">
                {title}
            </DialogTitle>

            <DialogActions>
                <Button onClick={onConfirm} autoFocus>
                    Ok
                </Button>
            </DialogActions>

        </Dialog>
    );
}
