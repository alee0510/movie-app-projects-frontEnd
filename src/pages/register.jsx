import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Grid, FormControl, InputLabel, Input, InputAdornment, IconButton, Button } from '@material-ui/core'
import LinearProgress from '@material-ui/core/LinearProgress'

import AccountCircle from '@material-ui/icons/AccountCircle'
import LockIcon from '@material-ui/icons/Lock'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import EmailIcon from '@material-ui/icons/Email'
import '../style/register.css'

// API
import Axios from 'axios'
import API_URL from '../supports'

// redux
import { Redirect, Link } from 'react-router-dom'

const InputStyle = withStyles({
    underline: {
        color: 'white',
        borderBottom: 'white',
        width : '25vw',
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

class Register extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            vis : false,
            show : false,
            regis : false,
            char : false, 
            num : false,
            spec : false,
            value : 0
        }
    }

    regisUser = () => {
        let { char, spec, num } = this.state
        let username = this.text.value
        let email = this.email.value
        let pass = this.pass.value
        let confirmPass = this.confirmPass.value
        console.info('username : ', username, ' email : ', email, ' pass : ', pass, ' confirm pass : ', confirmPass)
        if ( pass !== confirmPass ) {
            alert ('Invalid password')
        } else {
            Axios.get(API_URL + 'user', {
                params : {username} // check if username is already exist
            })
            .then ((res) => {
                if (res.data.length !== 0) {
                    alert ('username has been taken')
                } else {
                    if ( char && num && spec) {
                        Axios.post(API_URL + 'user', {
                            username : username, 
                            pass : pass,
                            email : email,
                            role : 'user',
                            avatar : '',
                            cart : []
                        })
                        .then ((res) => {
                            this.setState({regis : true}) // update regis status to true
                            console.table(res.data)
                        })
                        .catch ( (err) => console.log(err))
                        // clear input value
                        this.username.value = ''
                        this.email.value = ''
                        this.pass.value = ''
                        this.confirmPass.value = ''
                    } else {
                        alert ('please fill the password requirments')
                    }
                }
            })
            .catch ( (err) => console.log(err))
        }
    }

    handleClickShowPassword = () => {
        this.setState({vis : !this.state.vis}, () => {
            console.info('show value : ', this.state.vis)
        })
    }

    handleChange = (event) => {
        // let { num, spec, char } = this.state
        let pass = event.target.value
        let numb = /[0-9]/
        let specs = /[!@#$%^&*;]/

        let num = numb.test(pass) ? 40 : 0
        let spec = specs.test(pass) ? 30 : 0
        let char = pass.length > 7 ? 30 : 0

        let numBol = numb.test(pass)
        let specsBol = specs.test(pass)
        let charBol = pass.length > 7
        this.setState({value : num + spec + char, num : numBol, spec : specsBol, char : charBol})
    }

    showReg = () => {
        this.setState ( {show : true} )
    }

    render () {
        if (this.state.regis) {
            return <Redirect to = '/login'></Redirect>
        }
        let {show, vis , value} = this.state
        console.log('value progress : ' + value)
        return (
            <div id = 'reg'>
                <h1>Register</h1>
                <div id = 'inputGrid'>
                    <Grid container spacing={2} alignItems="flex-end" id = 'grid'>
                            <Grid item>
                                <AccountCircle/>
                            </Grid>
                            <Grid item>
                                <FormControl style = {{padding : '5px 0px 5px 0px'}} >
                                    <InputLabel htmlFor="adornment-amount" style = {{color : 'white'}}>Username</InputLabel>
                                    <InputStyle
                                        type = 'text'
                                        inputRef = {text => this.text = text}
                                    />
                                </FormControl>  
                            </Grid>
                    </Grid>
                    <Grid container spacing={2} alignItems="flex-end" id = 'grid'>
                            <Grid item>
                                <EmailIcon/>
                            </Grid>
                            <Grid item>
                                <FormControl style ={{padding : '5px 0px 5px 0px'}} >
                                    <InputLabel htmlFor="adornment-amount" style = {{color : 'white'}}>Email</InputLabel>
                                    <InputStyle
                                        type = 'text'
                                        inputRef = {email => this.email = email}
                                    />
                                </FormControl>  
                            </Grid>
                    </Grid>
                    <Grid container spacing={2} alignItems="flex-end" id = 'grid'>
                            <Grid item>
                                <LockIcon/>
                            </Grid>
                            <Grid item>
                                <FormControl style ={{padding : '5px 0px 5px 0px'}} >
                                    <InputLabel htmlFor="adornment-amount" style = {{color : 'white'}}>Password</InputLabel>
                                    <InputStyle
                                        type = {vis ? 'text' : 'password'}
                                        onChange = {this.handleChange} 
                                        onFocus = {this.showReg}
                                        inputRef = {pass => this.pass = pass}
                                        endAdornment={
                                            <InputAdornment position="end" >
                                                <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={this.handleClickShowPassword}
                                                >
                                                {vis ? <Visibility style = {{color : 'white'}}/> : <VisibilityOff style = {{color : 'white'}}/>}
                                                </IconButton>
                                        </InputAdornment>
                                        }
                                    />
                                </FormControl>  
                            </Grid>
                            <Grid item>
                            </Grid>
                    </Grid>
                    <Grid container spacing={2} alignItems="flex-end" id = 'grid'>
                            <Grid item>
                                <LockIcon/>
                            </Grid>
                            <Grid item>
                                <FormControl style ={{padding : '5px 0px 5px 0px'}} >
                                    <InputLabel htmlFor="adornment-amount" style = {{color : 'white'}}>Confirm Password</InputLabel>
                                    <InputStyle
                                        type = {vis ? 'text' : 'password'}
                                        inputRef = {confirmPass => this.confirmPass = confirmPass}
                                        endAdornment={
                                            <InputAdornment position="end" >
                                                <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={this.handleClickShowPassword}
                                                >
                                                {vis ? <Visibility style = {{color : 'white'}}/> : <VisibilityOff style = {{color : 'white'}}/>}
                                                </IconButton>
                                        </InputAdornment>
                                        }
                                    />
                                </FormControl>  
                            </Grid>
                    </Grid>
                </div>
                <div className = 'btn-reg'>
                    <Link to = '/'>
                        <Button id = 'btn-cancel' >Cancel</Button>
                    </Link>
                    <Button variant = 'contained' id = 'btn-register' onClick = {this.regisUser}>Register</Button>
                </div>
                <LinearProgress variant="determinate" value  = {value} color={value > 40 ? "primary" : "secondary"} id = 'progress'/>
                {
                    show ? <p style ={{color : value > 80 ? 'green' : 'red'}} id = 'alert-pass-msg'>*password length must 8 or more, include special character and number </p> : null
                }
            </div>
        )
    }
}


export default Register