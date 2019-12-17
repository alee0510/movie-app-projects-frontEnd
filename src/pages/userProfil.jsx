import React from 'react'
import { Button, Avatar, Table, TableRow, TableCell, TableBody } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { theme } from '../style/theme'
// import { connect } from 'react-redux'
import Axios from 'axios'
import API_URL from '../supports'

import '../style/profil.css'

const Cell = withStyles({
    root : {
        color : theme.palette.secondary.text,
        textAlign : 'left'
    }
})(TableCell)

class UserProfil extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            user : []
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
        let {user} = this.state
        return (
            <Table className = 'profil-table'>
                <TableBody>
                    <TableRow>
                        <Cell>Username </Cell>
                        <Cell>: {user.username}</Cell>
                    </TableRow>
                    <TableRow>
                        <Cell>Email </Cell>
                        <Cell>: {user.email}</Cell>
                    </TableRow>
                </TableBody>
            </Table>
        )
    }
    
    render () {
        let {user} = this.state
        console.table(user)
        return (
            <div className = 'user-container'>
                <Avatar alt='user-avatar' src={user.avatar} style ={{width : '100px', height : '100px'}} id = 'user-avatar'/>
                <div className = 'user-data'>
                    {this.renderUserTable()}
                    <div className = 'user-btn'>
                        <Button variant = 'contained' id = 'user-edit-btn'>Edit</Button>
                        <Button variant = 'contained' id = 'change-pass-btn'>CHange Password</Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserProfil