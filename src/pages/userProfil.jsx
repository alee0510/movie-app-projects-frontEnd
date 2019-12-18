import React from 'react'
import { Button, Avatar, Table, TableRow, TableCell, TableBody, TextField, TableHead, Input, InputAdornment, IconButton} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { theme } from '../style/theme'
import { connect } from 'react-redux'
import { logIn } from '../actions'
import Axios from 'axios'
import API_URL from '../supports'
import AlertDialog from '../components/alertDialog'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

import '../style/profil.css'


const Cell = withStyles({
    root : {
        color : theme.palette.secondary.text,
        textAlign : 'left'
    }
})(TableCell)

const TextFieldStyled = withStyles({
    root: {
        width : '100%',
        '& .Mui-focused' : {
            color : '#f2f2f2',
            border : 'none'
        },
        '& .MuiInput-underline:after': {
            border : 'none'
        },
        '& .MuiInput-underline:before': {
            border : 'none'
        }
    }
})(TextField)

const InputStyle = withStyles({
    underline: {
        color: 'white',
        borderBottom: 'white',
        width : 300,
            '&:after': {
                border : 'none',			
            },				
            '&:focused::after': {
                border : 'none',
            },		
            '&:before': {
                border : 'none',			
            },
            '&:hover:not($disabled):not($focused):not($error):before': {
                border : 'none',
            },
            '&$disabled:before': {
                border : 'none',
            }
    },
    disabled: {},
    focused : {},
    error : {}
})(Input)

class UserProfil extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            user : [],
            edit : false,
            pass : false,
            show : false,
            alert : false, 
            successs: false
        }
    }

    componentDidMount () {
        Axios.get(API_URL + `user/${localStorage.getItem('id')}`)
        .then((res) => {
            this.setState({user : res.data})
        })
        .catch((err) => console.log(err))
    }

    renderUserTable = () => {
        let {user, edit} = this.state
        if (edit) {
            return (
                <TableHead>
                    <TableRow>
                        <Cell>Username </Cell>
                        <Cell>
                            <TextFieldStyled InputProps={{style: {color: 'white'}}} autoFocus inputRef = {editUsername => this.editUsername = editUsername} />
                        </Cell>
                    </TableRow>
                    <TableRow>
                        <Cell>Email </Cell>
                        <Cell>
                            <TextFieldStyled InputProps={{style: {color: 'white'}}} autoFocus inputRef = {editUserEmail => this.editUserEmail = editUserEmail}/>
                        </Cell>
                    </TableRow>
                </TableHead>
            )
        } else {
            return (
                <TableHead>
                    <TableRow>
                        <Cell>Username </Cell>
                        <Cell>: {user.username}</Cell>
                    </TableRow>
                    <TableRow>
                        <Cell>Email </Cell>
                        <Cell>: {user.email}</Cell>
                    </TableRow>
                </TableHead>
            )
        }
    }

    renderTableChangePass = () => {
        let {show} = this.state
        return (
            <TableBody>
                <TableRow>
                    <Cell>Enter old password</Cell>
                    <Cell>
                        <InputStyle
                            type = {show ? 'text' : 'password'} inputRef = {oldPass => this.oldPass = oldPass}
                            endAdornment={
                                <InputAdornment position="end" >
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={this.handleShow}
                                    >
                                    {show ? <Visibility style = {{color : 'white'}}/> : <VisibilityOff style = {{color : 'white'}}/>}
                                    </IconButton>
                            </InputAdornment>
                            }
                        />
                    </Cell>
                </TableRow>
                <TableRow>
                    <Cell>Enter new password</Cell>
                    <Cell>
                        <InputStyle
                            type = {show ? 'text' : 'password'} inputRef = {newPass => this.newPass = newPass}
                            endAdornment={
                                <InputAdornment position="end" >
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={this.handleShow}
                                    >
                                    {show ? <Visibility style = {{color : 'white'}}/> : <VisibilityOff style = {{color : 'white'}}/>}
                                    </IconButton>
                            </InputAdornment>
                            }
                        />
                    </Cell>
                </TableRow>
            </TableBody>
        )
    }

    UserProfilEdit = () => {
        this.setState({edit : true})
    }

    UserProfilCancel = () => {
        this.setState({edit : false})
    }
    
    UserProfilDone = () => {
        let newUsername = this.editUsername.value
        let newUserEmail = this.editUserEmail.value
        let id = this.state.user.id
        if (newUsername === '' || newUserEmail === '') {
            this.setState({edit : false})
        } else {
            Axios.patch(API_URL + `user/${id}`, {
                username : newUsername, 
                email : newUserEmail
            })
            .then((res) => {
                localStorage.setItem('username', newUsername)
                Axios.get((API_URL + `user/${id}`))
                .then((res) => {
                    this.setState({user : res.data, edit : false})
                    this.props.logIn(res.data)
                })
                .catch((err) => console.log(err))
            })
            .catch((err) => console.log(err))
        }
    }

    UserChangePass = () => {
        this.setState({pass : true})
    }

    UserPassCancel = () => {
        this.setState({pass : false})
    }

    UserPassDone = () => {
        let oldPass = this.oldPass.value
        let newPass = this.newPass.value
        let id = this.state.user.id
        if (oldPass === '' || newPass === '') {
            this.setState({pass : false})
        } else {
            Axios.get(API_URL + `user/${id}`)
            .then((res) => {
                if (res.data.pass !== oldPass) {
                    this.setState({alert : true})
                } else {
                    Axios.patch(API_URL + `user/${id}`, {pass : newPass})
                    .then((res) => this.setState({successs : true, pass : false}))
                    .catch((err) => console.log(err))
                }
            })
            .catch((err) => console.log(err))
        }
    }

    handleShow = () => {
        this.setState({show : !this.state.show})
    }

    handleClose = () => {
        this.setState({alert : false, successs : false})
    }

    render () {
        let {user, edit, pass, alert, successs} = this.state
        // console.table(user)
        return (
            <div className = 'user-container'>
                {
                    user.avatar !== '' ? <Avatar alt='user-avatar' src={user.avatar} style ={{width : '100px', height : '100px'}} id = 'user-avatar'/> 
                    : <Avatar alt='user-avatar' style ={{width : '100px', height : '100px', backgroundColor : '#2196F3'}} id = 'user-avatar'> {user.username.charAt(0).toUpperCase()}</Avatar>
                }
                <div className = 'user-data'>
                    <Table className = 'profil-table'>
                        {this.renderUserTable()}
                        {
                            pass ? this.renderTableChangePass() : <TableBody></TableBody>
                        }
                    </Table>
                    {
                        edit ?
                        <div className = 'user-btn'>
                            <Button variant = 'contained' id = 'user-done-btn' onClick = {this.UserProfilDone}>Done</Button>
                            <Button variant = 'contained' id = 'user-cancel-btn' onClick = {this.UserProfilCancel}>Cancel</Button>
                        </div>
                        : pass ?
                        <div className = 'user-btn'>
                            <Button variant = 'contained' id = 'pass-done-btn' onClick = {this.UserPassDone}>Done</Button>
                            <Button variant = 'contained' id = 'pass-cancel-btn' onClick = {this.UserPassCancel}>Cancel</Button>
                        </div>
                        :
                        <div className = 'user-btn'>
                            <Button variant = 'contained' id = 'user-edit-btn' onClick = {this.UserProfilEdit}>Edit</Button>
                            <Button variant = 'contained' id = 'change-pass-btn' onClick = {this.UserChangePass}>Change Password</Button>
                        </div>
                    }
                    <AlertDialog
                    open = {alert ? alert : successs ? successs : false}
                    title = {alert ? 'Sorry' : 'Success'}
                    contents = {alert ? 'Your old password doesnt macth with our data base' : 'Your password has been changed'}
                    handleButtonTwo = {this.handleClose}
                    handleButtonOne = ""
                    displayOne = 'none'
                    displayTwo = 'block'
                    ButtonTwoName = 'OK'
                    ButtonOneName = ""
                    />
                </div>
            </div>
        )
    }
}

// const mapStore = (state) => {
//     return {
//         id : state.login.id
//     }
// }

export default connect(null, {logIn})(UserProfil)