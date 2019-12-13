import React from 'react'
import { Avatar, Menu , MenuItem } from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { user } from '../assets'
import './avatar.css'

class Profil extends React.Component {
    constructor (props) {
        super (props)
        this.state = {
            show : false
        }
    }

    handleClose = () => {
        this.setState({show : !this.state.show}, () => {
            console.log(this.state.show)
        })
    }

    render () {
        return (
            <div className = 'avatar'>
                {/* <Avatar alt="Remy Sharp">H</Avatar>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg"></Avatar>
                <Avatar> <AccountCircleIcon/></Avatar> */}
                <Avatar alt = 'user' src = {user} onClick={this.handleClose}/>
            </div>
        )
    }
}

export default Profil