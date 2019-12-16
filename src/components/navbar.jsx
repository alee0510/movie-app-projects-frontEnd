import React from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Button, Badge } from '@material-ui/core'
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'

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
            cinemas : false
        }
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
        console.info(home, movies, cinemas)
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
                        <Badge badgeContent={1} color="secondary" id = 'ticket'>
                            <ConfirmationNumberIcon />
                        </Badge>
                        <Badge badgeContent={1} color="secondary" id = 'shop-cart'>
                            <ShoppingCartIcon />
                        </Badge>
                        <Search/>
                </div>
            </AppBar>
        )
    }
}

export default Navbar