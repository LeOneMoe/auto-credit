import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function DeleteDialog({
                                         isOpen = false,
                                         onConfirm,
                                         onClose,
                                         title,
                                         content
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
                Do you want to delete this user?
            </DialogTitle>

            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {content}
                    This action can`t be undone.
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>
                    No
                </Button>
                <Button onClick={onConfirm} autoFocus>
                    Yes
                </Button>
            </DialogActions>

        </Dialog>
    );
}
