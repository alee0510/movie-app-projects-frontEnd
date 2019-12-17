import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AlertDialog(props) {
    return (
        <div>
        <Dialog
            open={props.open}
            onClose={props.close}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {props.contents}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.hanldeButtonOne} color="primary">
                    {props.ButtonOneName}
                </Button>
                <Button onClick={props.handleButtonTwo} color="primary" autoFocus>
                    {props.ButtonTwonName}
                </Button>
            </DialogActions>
        </Dialog>
        </div>
    )
}