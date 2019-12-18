import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { makeStyles } from '@material-ui/core/styles'
import '../style/alertDialog.css'

const useStyles = makeStyles({
    title: {
        backgroundColor: '#263238',
        color : 'white !important'
    },
    contents : {
        backgroundColor: '#4f5b62',
        color : 'white !important'
    },
    button : {
        backgroundColor: '#4f5b62',
        color : 'white !important'
    }
})


export default function AlertDialog(props) {
    const classes = useStyles()
    return (
        <div>
            <Dialog
                open={props.open}
                onClose={props.close}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                >
                <DialogTitle id="alert-dialog-title" className = {classes.title}>{props.title}</DialogTitle>
                <DialogContent className = {classes.contents}>
                    <DialogContentText id="alert-dialog-description">
                        {props.contents}
                    </DialogContentText>
                </DialogContent>
                <DialogActions className = {classes.button}>
                    <Button 
                    onClick={props.hanldeButtonOne} 
                    variant  = 'contained' 
                    color="primary"
                    style = {{borderRadius : '50px', display : props.displayOne}}
                    >
                        {props.ButtonOneName}
                    </Button>
                    <Button 
                    onClick={props.handleButtonTwo} 
                    variant  = 'contained' 
                    color="secondary" 
                    autoFocus
                    style = {{borderRadius : '50px', display : props.displayTwo}}
                    >
                        {props.ButtonTwoName}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}