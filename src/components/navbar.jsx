import React from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Button } from '@material-ui/core'

// import component
import AvaMenu from './avatarMenu'
import Search from './search'

// imort style
import '../style/navbar.css'

const Menu = () => {
    const [click, navClick] = React.useState(false)
    return (
        <div className = 'menu' >
            <Link to ='/'>
                <Button id = 'home' style = {{color : 'white'}}>Home</Button>
            </Link>
            <Link to ='/movies'>
                <Button id = 'movies' style = {{color : 'white'}}>Movies</Button>
            </Link>
            <Link to ='/cinemas'>
                <Button id = 'cinemas' style = {{color : 'white'}}>Cinemas</Button>
            </Link>
        </div>
    )
}

class Navbar extends React.Component {
    render () {
        return (
            <AppBar id = "navbar" position="static">
                <div id = 'left-navbar'>
                        <AvaMenu/>
                </div>
                <div id = 'center-navbar'>
                        <Menu/>
                </div>
                <div id = 'right-navbar'>
                        <Search/>
                </div>
            </AppBar>
        )
    }
}

export default Navbar