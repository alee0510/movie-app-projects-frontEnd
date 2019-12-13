import React from 'react'
import { Route } from 'react-router-dom'

// import components
import Navbar from './components/navbar'
import Banner from './components/banner'

// import pages
import Home from './pages/home'
import Login from './pages/login'
import Register from './pages/register'
import StoreManager from './pages/storeManager'
import MovieDetail from './pages/movieDetail'
import SeatReservation from './pages/seatReservation'

class Main extends React.Component {
    render () {
        return (
            <div>
                <Navbar/>
                <Banner/>
                <Route path = '/' component = {Home} exact />
                <Route path = '/login' component = {Login} />
                <Route path = '/register' component = {Register} />
                <Route path = '/storeManager' component = {StoreManager} />
                <Route path = '/movieDetails' component = {MovieDetail} />
                <Route path = '/seatReservation' component = {SeatReservation} />
            </div>
        )
    }
}

export default Main