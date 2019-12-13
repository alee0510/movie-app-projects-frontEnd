import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Grid } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import '../style/movieDetails.css'

import Axios from 'axios'
import API_URL from '../supports'

class MovieDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            movieDetails : []
        }
    }

    componentDidMount () {
        let id = this.props.location.search.split('=')[1]
        Axios.get(API_URL + `movies/${id}`)
        .then((res) => {
            this.setState({movieDetails : res.data})
        })
        .catch((err) => console.log(err))
    }

    render () {
        // debug
        console.info('page id : ',this.props.location.search.split('=')[1])
        console.info('try to get page id : ', this.props.location.search)
        console.table(this.state.movieDetails)

        let movies = this.state.movieDetails
        if (movies.length === 0) {
            return (
                <div style = {{width : '50%', margin : 'auto'}}>
                    <CircularProgress color="secondary" style = {{ margin : '25vh 50%'}}/>
                </div>
            )
        }
        return (
            <div>
                {
                    movies.length === 0 ?
                    <CircularProgress color="secondary"/>
                    :
                    <Grid container className = 'movie-details'>
                        <Grid item className = 'img-container' md = {5} >
                            <img src = {movies.poster} alt = 'poster-img' width = '100px' id = 'movie-img'/>
                        </Grid>
                        <Grid item className = 'movie-contents-container' md = {6} xs={12}>
                            <iframe width="100%" height="50%" 
                            src={`https://www.youtube.com/embed/${movies.youtubeID}`} 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen
                            style = {{borderRadius : '35px'}}
                            title = {movies.id}
                            >
                            </iframe>
                            <div id = 'movie-details-text'>
                                <div id = 'text-container'>
                                    <h1>Title :  {movies.title}</h1>
                                    <h3>Genre : {movies.genre.join(', ')}</h3>
                                    <h4>Synopsis : <br/><br/> {movies.plot.split(' ', 50).join(' ') + '...'}</h4>
                                </div>
                                <div className = 'btn-container'>
                                    <Link to ='/'>
                                        <Button variant = 'contained' id = 'btn-detail-cancel'>Cancel</Button>
                                    </Link>
                                    <Link to ='/seatReservation'>
                                        <Button variant = 'contained' id ='btn-buy-now'>Buy Now</Button>
                                    </Link>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                }
            </div>
        )
    }
}

export default MovieDetail