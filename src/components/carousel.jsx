import React, { Component } from "react"
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Grid, Card } from '@material-ui/core'
import Slider from "react-slick"

class CardCarousel extends Component {
    renderCard = () => {
        return this.props.movies.map( (item, index) => {
            return (
                <Link to = '/movieDetails'>
                <Grid item 
                key = {index} 
                className = 'gridItems' 
                id = {item.id} 
                >
                    <Card id = 'card' onClick = { ()=> this.cardClick(item.id)}>
                        <img src = {item.poster} alt = 'poster-img' id = 'img'/>
                        <div id = 'overlay'></div>
                        <div id = 'title' > {item.title}</div>
                    </Card>
                </Grid>
                </Link>
            )
    })}
    render() {
        const settings = {
            dots: true,
            infinite: true,
            slidesToShow: 5,
            slidesToScroll: 1,
            autoplay: true,
            speed: 2000,
            autoplaySpeed: 2000,
            cssEase: "Link"
        }
        return (
            <div>
                <h2>Trending</h2>
                <Slider {...settings}>
                    {this.renderCard()}
                </Slider>
            </div>
        )
    }
}

const mapStore = (state) => {
    return {
        movies : state.movie.movie
    }
}
export default connect(mapStore)(CardCarousel)
