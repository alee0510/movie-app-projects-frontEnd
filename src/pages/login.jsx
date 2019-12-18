import React from 'react'

import { withStyles } from '@material-ui/core/styles'
import { Grid, FormControl, InputLabel, Input, InputAdornment, IconButton, Button } from '@material-ui/core'

import AccountCircle from '@material-ui/icons/AccountCircle'
import LockIcon from '@material-ui/icons/Lock'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

import '../style/login.css'

// API
import Axios from 'axios'
import API_URL from '../supports'

// redux
import { logIn, Movie } from '../actions'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

const InputStyle = withStyles({
    underline: {
        color: 'white',
        borderBottom: 'white',
        width : 300,
            '&:after': {
                borderBottom: `2px solid white`,			
            },				
            '&:focused::after': {
                borderBottom: `2px solid white`,
            },		
            '&:before': {
                borderBottom: `1px solid white`,			
            },
            '&:hover:not($disabled):not($focused):not($error):before': {
                borderBottom: '2px solid rgb(255, 255, 255) !important',
            },
            '&$disabled:before': {
                borderBottom: `1px dotted white`,
            }
    },
    disabled: {},
    focused : {},
    error : {}
})(Input)

class Login extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            show : false
        }
    }

    loginUser = () => {
        let username = this.text.value
        let pass = this.pass.value
        console.warn('username : ', username, ' & password', pass)
        // check username in data base
        Axios.get(API_URL + 'user', {
            params : {
                username, pass
            }
        }) // try to get username and data in our db.json, output : single object or array
        .then ((res) => {
            if (res.data.length === 0) {
                alert('Invalid username or password')
            } else {
                console.log(res.data)
                console.table(res.data[0]) // output will be object
                // assign it value to local storage and our global state
                localStorage.setItem('username', username)
                // localStorage.setItem('role', res.data[0].role)
                localStorage.setItem('id', res.data[0].id)
                this.props.logIn(res.data[0])
                Axios.get(API_URL + 'movies') // store movies data base to global state
                .then ((res) => {this.props.Movie(res.data)})
                .catch ((err) => console.log(err))
            }
            // clear input value
            this.text.value = ''
            this.pass.value = ''
        })
        .catch((err) => console.log(err))
    }

    handleClickShowPassword = () => {
        this.setState({show : !this.state.show}, () => {
            console.info('show value : ', this.state.show)
        })
    }

    render () {
        let show = this.state.show
        if (this.props.username) { 
            return (
                <Redirect to = '/'></Redirect> // redirect to Home page
            )
        }
        return (
            <div id = 'login'>
                <h1>Login</h1>
                <div id = 'inputGrid'>
                    <Grid container spacing={2} alignItems="flex-end" id = 'grid'>
                            <Grid item>
                                <AccountCircle/>
                            </Grid>
                            <Grid item>
                                <FormControl style = {{padding : '5px 0px 5px 0px'}} id = 'form'>
                                    <InputLabel htmlFor="adornment-amount" style = {{color : 'white'}}>Username</InputLabel>
                                    <InputStyle
                                        inputRef = {text => this.text = text}
                                    />
                                </FormControl>  
                            </Grid>
                    </Grid>
                    <Grid container spacing={2} alignItems="flex-end" id = 'grid2'>
                            <Grid item>
                                <LockIcon/>
                            </Grid>
                            <Grid item>
                                <FormControl style ={{padding : '5px 0px 5px 0px'}} >
                                    <InputLabel htmlFor="adornment-amount" style = {{color : 'white'}}>Password</InputLabel>
                                    <InputStyle
                                        type = {show ? 'text' : 'password'}
                                        inputRef = {pass => this.pass = pass}
                                        endAdornment={
                                            <InputAdornment position="end" >
                                                <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={this.handleClickShowPassword}
                                                >
                                                {show ? <Visibility style = {{color : 'white'}}/> : <VisibilityOff style = {{color : 'white'}}/>}
                                                </IconButton>
                                        </InputAdornment>
                                        }
                                    />
                                </FormControl>  
                            </Grid>
                    </Grid>
                </div>
                <Button variant = 'contained' color = 'primary' id = 'btnLg' onClick = {this.loginUser}>Sign In</Button>
            </div>
        )
    }
}

// global state
const mapStore = (state) => { // reducer
    return {
        username : state.login.username,
        pass : state.login.pass,
        role : state.login.role,
    }
}

// action
const mapDispatch = () => {
    return {logIn, Movie}
}

export default connect(mapStore, mapDispatch())(Login)