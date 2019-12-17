import React from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Button, Badge } from '@material-ui/core'
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import { connect } from 'react-redux'
import API_URL from '../supports'
import Axios from 'axios'
import { logIn } from '../actions'

// import component
import AvaMenu from './avatarMenu'
import Search from './search'

// imort style
import '../style/navbar.css'

function Menu (props) {
    const Menu = {
        backgroundColor : props.home ? '#bb002f' : '',
        color : 'white'
    }

    const Movies = {
        backgroundColor : props.movie ? '#bb002f' : '',
        color : 'white'
    }

    const Cinemas = {
        backgroundColor : props.cinemas ? '#bb002f' : '',
        color : 'white'
    }

    return (
        <div className = 'menu' >
            <Link to ='/' style = {{textDecoration : 'none'}}>
                <Button id = 'home' style = {Menu} onClick = {props.handleMenu}>Home</Button>
            </Link>
            <Link to ='/movies' style = {{textDecoration : 'none'}}>
                <Button id = 'movies' style = {Movies} onClick = {props.hadleMovies}>Movies</Button>
            </Link>
            <Link to ='/cinemas' style = {{textDecoration : 'none'}}>
                <Button id = 'cinemas' style = {Cinemas} onClick = {props.handleCinema}>Cinemas</Button>
            </Link>
        </div>
    )
}

class Navbar extends React.Component {
    constructor (props) {
        super (props)
        this.state = {
            home : true,
            movies : false, 
            cinemas : false,
            userHistoryTranscation : 0
        }
    }

    componentDidMount () {
        Axios.get(API_URL + `user/${localStorage.getItem('id')}`)
        .then((res) => {
            this.props.logIn(res.data)
            Axios.get(API_URL + `transactions/?userID=${localStorage.getItem('id')}`)
            .then((res) => {
                if (res.data[0].length === 0) { // user doesn't make transaction yet
                    this.setState({userHistoryTranscation : 0})
                } else {
                    this.setState({userHistoryTranscation : res.data[0].transactionsHistory.length})
                }
            })
            .catch((err) => console.log(err))
        })
        .catch((err) => console.log(err))
    }

    Home = () => {
        console.log('home')
        this.setState({
            home : true,
            movies : false,
            cinemas : false
        })
    }

    Movies = () => {
        console.log('movie')
        this.setState({
            home : false,
            movies : true,
            cinemas : false
        })
    }

    Cinemas = () => {
        console.log('cinema')
        this.setState({
            home : false,
            movies : false,
            cinemas : true
        })
    }

    render () {
        let {home, movies, cinemas} = this.state
        let len = this.props.cart.length
        console.info('home :', home, 'movies :', movies, 'cinemas :', cinemas)
        return (
            <AppBar id = "navbar" position="static">
                <div id = 'left-navbar'>
                        <AvaMenu/>
                </div>
                <div id = 'center-navbar'>
                        <Menu 
                        handleMenu = {this.Home} 
                        hadleMovies = {this.Movies} 
                        handleCinema = {this.Cinemas}
                        home = {home}
                        movie = {movies}
                        cinemas = {cinemas}
                        />
                </div>
                <div id = 'right-navbar'>
                        <Badge badgeContent={this.state.userHistoryTranscation} color="secondary" id = 'ticket'>
                            <ConfirmationNumberIcon style ={{color : 'white'}}/>
                        </Badge>
                        <Link to = '/userCart' style = {{textDecoration : 'none'}}>
                            <Badge badgeContent={len} color="secondary" id = 'shop-cart'>
                                <ShoppingCartIcon style ={{color : 'white'}}/>
                            </Badge>
                        </Link>
                        <Search/>
                </div>
            </AppBar>
        )
    }
}

const mapStore = (state) => {
    return {
        cart : state.login.cart
    }
}

export default connect(mapStore, {logIn}) (Navbar)