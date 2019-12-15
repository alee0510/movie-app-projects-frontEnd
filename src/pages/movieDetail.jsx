import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Button, Grid } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import '../style/movieDetails.css'

import Axios from 'axios'
import API_URL from '../supports'
import { connect } from 'react-redux'

class MovieDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            movieDetails : [],
            isLogin : false,
            toLogin : false
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

    BuyNow = () => {
        if (this.props.username) {
            this.setState({isLogin : true})
        } else {
            this.setState({toLogin : true})
        }
    }

    render () {
        // debug
        console.info('page id : ',this.props.location.search.split('=')[1])
        console.info('try to get page id : ', this.props.location.search)
        // console.table(this.state.movieDetails)

        let { movieDetails , isLogin, toLogin} = this.state

        if (isLogin) {
            return <Redirect to = {{pathname : '/seatReservation', state : movieDetails}}></Redirect>
        } else if (toLogin) {
            return <Redirect to = '/login'></Redirect>
        }

        return (
            <div>
                {
                    movieDetails.length === 0 ?
                    <div style = {{width : '50%', margin : 'auto'}}>
                        <CircularProgress color="secondary" style = {{ margin : '25vh 50%'}}/>
                    </div>
                    :
                    <Grid container className = 'movie-details'>
                        <Grid item className = 'img-container' md = {5} >
                            <img src = {movieDetails.poster} alt = 'poster-img' width = '100px' id = 'movie-img'/>
                        </Grid>
                        <Grid item className = 'movie-contents-container' md = {6} xs={12}>
                            <iframe width="100%" height="50%" 
                            src={`https://www.youtube.com/embed/${movieDetails.youtubeID}`} 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen
                            style = {{borderRadius : '35px'}}
                            title = {movieDetails.id}
                            >
                            </iframe>
                            <div id = 'movie-details-text'>
                                <div id = 'text-container'>
                                    <h1>Title :  {movieDetails.title}</h1>
                                    <h3>Genre : {movieDetails.genre.join(', ')}</h3>
                                    <h4>Synopsis : <br/><br/> {movieDetails.plot.split(' ', 50).join(' ') + '...'}</h4>
                                </div>
                                <div className = 'btn-container'>
                                    <Link to ='/' style ={{textDecoration : 'none'}}>
                                        <Button variant = 'contained' id = 'btn-detail-cancel'>Cancel</Button>
                                    </Link>
                                    <Button variant = 'contained' id ='btn-buy-now' onClick = {this.BuyNow}>Buy Now</Button>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                }
            </div>
        )
    }
}

const mapStore = (state) => {
    return {
        username : state.login.username
    }
}
export default connect(mapStore) (MovieDetail)