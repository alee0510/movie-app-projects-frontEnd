import React from 'react'
import { Link } from 'react-router-dom'

// style
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'
import '../style/home.css'

// redux
import { connect } from 'react-redux'
import Axios from 'axios'
import API_URL from '../supports'
import { Movie, storeBanner } from '../actions'

// import banner
import Banner from '../components/banner'

class Home extends React.Component {

    componentDidMount () {
        Axios.get(API_URL + 'movies') // store movies data base to global state
        .then ((res) => {
            this.props.Movie(res.data)
        })
        .catch ((err) => console.log(err))
        Axios.get(API_URL + 'banners')
        .then((res) => {this.props.storeBanner(res.data)})
        .catch((err) => console.log(err))
    }
    
    renderCard = () => {
        return this.props.movies.map( (item, index) => {
            return (
                <Link to = {`/movieDetails?id=${item.id}`} key = {item.id}>
                    <Grid item 
                    className = 'home-grid' 
                    id = {item.id} 
                    >
                        <Card id = 'home-card'>
                            <img src = {item.poster} alt = 'poster-img' id = 'home-img'/>
                            <div id = 'home-overlay'></div>
                            <div id = 'home-title' > {item.title}</div>
                        </Card>
                    </Grid>
                </Link>
            )
    })}

    render () {

        if (this.props.movies.length === 0) {
            return (
                <div style = {{width : '50%', margin : 'auto'}}>
                    <CircularProgress color="secondary" style = {{ margin : '25vh 50%'}}/>
                </div>
            )
        }

        return (
            <div className = 'home-container' >
                <Banner/>
                <Grid container spacing={2} id = 'home-movie-container'>
                    <Grid item>
                        <h1 style = {{color : 'white'}}>Latest Movies</h1>
                    </Grid>
                    <Grid container spacing={2} id = 'home-movie-card-container'>
                        {this.renderCard()}
                    </Grid>
                </Grid>
            </div>
        )
    }
}

const mapStore = (state) => { // reducer
    return {
        movies : state.movie.movie
    }
}

export default connect(mapStore, {Movie, storeBanner})(Home)