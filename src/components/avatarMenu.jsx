import React from 'react'
import { Link } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles'
import { Menu, MenuItem, ListItemIcon, ListItemText, Avatar, Typography } from '@material-ui/core'

// import icons
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import StoreIcon from '@material-ui/icons/Store'
import HistoryIcon from '@material-ui/icons/History'


// import color pallete
import { theme } from '../style/theme'
import { user } from '../assets'

import { connect } from 'react-redux'
import { logOut } from '../actions'

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #263238',
        borderRadius : '25px',
        backgroundColor : theme.palette.primary.main,
        width : '250px'
    }
})(props => (
    <Menu
        elevation={0} 
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
        }}
        transformOrigin = {{
            vertical : 'top',
            horizontal : 'left'
        }}
        {...props}
    />
))

const StyledMenuItem = withStyles(theme => ({
  root: {
    '&:focus': {
        backgroundColor: theme.palette.secondary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.secondary.text,
 
        }
    }
  }
}))(MenuItem)

class AvaMenu extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            anchorEl : null
        }
    }

    handleClick = (event) => {
        this.setState({ anchorEl : event.currentTarget})
    }

    handleClose = () => {
        this.setState({ anchorEl : null})
    }

    logOutUser = () => {
        localStorage.clear()
        window.location.reload()
    }
    
    render () {
        const avatar = {
            cursor : 'pointer',
            display : 'inline-flex',
            alignItems : 'center',
            zIndex : 5
        }
        const avaImg = {
            height : '35px',
            width : '35px',
            backgroundColor : this.props.role === 'admin' ? '#F44336' : '#2196F3'
        }

        return (
            <div>
                <div className = 'avatar' style = {avatar} onClick={this.handleClick} id = 'av'>
                    {
                        this.props.profil ? <Avatar alt = 'user' src = {this.props.profil} style = {avaImg} ></Avatar>
                        : this.props.role === 'admin' ? <Avatar style = {avaImg}>A</Avatar> 
                        : this.props.role === 'user' ? <Avatar style = {avaImg}>{localStorage.getItem('username').charAt(0).toUpperCase()}</Avatar>
                        : <Avatar src = {user} style = {avaImg}></Avatar>
                    }
                    <Typography style = {{ marginLeft : '10px' }}> {this.props.username || localStorage.getItem('username') ? `Hi! ${localStorage.getItem('username')}` : 'Login'} </Typography>
                </div>
                <StyledMenu
                    id="customized-menu"
                    anchorEl={this.state.anchorEl}
                    keepMounted
                    open={Boolean(this.state.anchorEl)}
                    onClose={this.handleClose}
                    style = {{marginTop : '20px'}}
                >
                    {
                        localStorage.getItem('username') === null ? 
                        <div>
                            <Link to = '/login' onClick = {this.handleClose} 
                            style = {{textDecoration : 'none', color : 'white'}}> 
                                <StyledMenuItem>
                                    <ListItemIcon>
                                        <AccountCircleIcon fontSize="small" style ={{color : 'white'}}/>
                                    </ListItemIcon>
                                    <ListItemText id = 'text' primary="Login"/>
                                </StyledMenuItem>
                            </Link>
                            <Link to = '/register' onClick = {this.handleClose} 
                            style = {{textDecoration : 'none', color : 'white'}}> 
                                <StyledMenuItem>
                                    <ListItemIcon>
                                        <PersonAddIcon fontSize="small" style ={{color : 'white'}}/>
                                    </ListItemIcon>
                                    <ListItemText id = 'text' primary="Register" />
                                </StyledMenuItem>
                            </Link>
                        </div>
                        : this.props.role === 'admin' ?
                        <div>
                            <Link to ='/storeManager' onClick = {this.handleClose} style = {{textDecoration : 'none', color : 'white'}}> 
                                <StyledMenuItem>
                                    <ListItemIcon>
                                        <StoreIcon fontSize="small" style ={{color : 'white'}}/>
                                    </ListItemIcon>
                                    <ListItemText id = 'text' primary="Store Manager" />
                                </StyledMenuItem>
                            </Link>
                            <Link to = '/' 
                            style = {{textDecoration : 'none', color : 'white'}}> 
                            <StyledMenuItem >
                                <ListItemIcon>
                                    <HistoryIcon fontSize="small" style ={{color : 'white'}}/>
                                </ListItemIcon>
                                <ListItemText id = 'text' primary="History Transactions" />
                            </StyledMenuItem>
                            </Link>
                            <Link to = '/' onClick={(event) => { this.logOutUser(); this.props.logOut(); this.handleClose()}} 
                            style = {{textDecoration : 'none', color : 'white'}}> 
                            <StyledMenuItem >
                                <ListItemIcon>
                                    <ExitToAppIcon fontSize="small" style ={{color : 'white'}}/>
                                </ListItemIcon>
                                <ListItemText id = 'text' primary="Log out" />
                            </StyledMenuItem>
                            </Link>
                        </div>
                        :
                        <div>
                            <Link to = '/userProfil' onClick = {this.handleClose} style = {{textDecoration : 'none', color : 'white'}}> 
                                <StyledMenuItem>
                                    <ListItemIcon>
                                        <AccountCircleIcon fontSize="small" style ={{color : 'white'}}/>
                                    </ListItemIcon>
                                    <ListItemText id = 'text' primary="My Profil" />
                                </StyledMenuItem>
                            </Link>
                            <Link to = '/' onClick={(event) => { this.logOutUser(); this.props.logOut(); this.handleClose()}} 
                            style = {{textDecoration : 'none', color : 'white'}}> 
                            <StyledMenuItem >
                                <ListItemIcon>
                                    <ExitToAppIcon fontSize="small" style ={{color : 'white'}}/>
                                </ListItemIcon>
                                <ListItemText id = 'text' primary="Log Out" />
                            </StyledMenuItem>
                            </Link>
                        </div>
                    }
                </StyledMenu>
            </div>
        )
    }
}

const MapStore = (state) => {
    return {
        username : state.login.username,
        profil : state.login.avatar,
        role : state.login.role
    }
}

const MapDispatch = () => {
    return {logOut}
}

export default connect(MapStore, MapDispatch())(AvaMenu)