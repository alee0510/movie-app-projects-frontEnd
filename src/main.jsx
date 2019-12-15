import React from 'react'
import { Route } from 'react-router-dom'

// import components
import Navbar from './components/navbar'
import Footer from './components/footer'

// import pages
import Home from './pages/home'
import Login from './pages/login'
import Register from './pages/register'
import StoreManager from './pages/storeManager'
import MovieDetail from './pages/movieDetail'
import SeatReservation from './pages/seatReservation'
import Movies from './pages/movies'
import UserProfil from './pages/userProfil'

class Main extends React.Component {
    render () {
        return (
            <div>
                <Navbar/>
                <Route path = '/' component = {Home} exact />
                <Route path = '/login' component = {Login} />
                <Route path = '/register' component = {Register} />
                <Route path = '/storeManager' component = {StoreManager} />
                <Route path = '/movieDetails' component = {MovieDetail} />
                <Route path = '/seatReservation' component = {SeatReservation} />
                <Route path = '/movies' component = {Movies} />
                <Route path = '/userProfil' component = {UserProfil} />
                <Footer/>
            </div>
        )
    }
}

export default Main