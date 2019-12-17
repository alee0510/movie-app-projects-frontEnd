import React from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios'
import API_URL from '../supports'
// import Slider from "react-slick"

// style
// import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import { withStyles } from '@material-ui/core/styles'
import '../style/home.css'

// redux
import { Movie, selectMovie } from '../actions'
import { connect } from 'react-redux'

// import banner
import Banner from '../components/banner'


const GridListStyled = withStyles({
    root : {
        width: '102%',
        // height: 'auto',
        paddingBottom : '2%',
        overflow : 'visible'
    }
})(GridList)


class Home extends React.Component {

    componentDidMount () {
        Axios.get(API_URL + 'movies')
        .then ((res) => {
            this.props.Movie(res.data)
        })
        .catch ((err) => console.log(err))
    }

    cardClick = (id) => {
        this.props.selectMovie(id)
    }
    
    renderCard = () => {
        return this.props.movies.map( (item, index) => {
            return (
                <Link to = {`/movieDetails?id=${item.id}`} key = {item.id}>
                    <Grid item 
                    className = 'home-grid' 
                    id = {item.id} 
                    >
                        <Card id = 'home-card' onClick = { ()=> this.cardClick(item.id)}>
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
                {/* <GridListStyled 
                cols = {5}
                rows = {1}
                cellHeight = {450}
                wrap = 'wrap'
                >
                </GridListStyled> */}
            </div>
        )
    }
}

const mapStore = (state) => { // reducer
    return {
        movies : state.movie.movie,
        movieID : state.movie.selectMovieID
    }
}

const mapDispatch = () => {
    return {Movie, selectMovie}
}

export default connect(mapStore, mapDispatch())(Home)