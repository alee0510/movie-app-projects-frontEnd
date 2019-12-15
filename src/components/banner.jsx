import React, { Component } from "react"
// import { Card } from '@material-ui/core'
import Slider from "react-slick"

import Axios from 'axios'
import API_URL from '../supports'
import '../style/banner.css'

class Banner extends Component {
    constructor (props) {
        super(props)
        this.state = {
            banner : []
        }
    }
    componentDidMount () {
        Axios.get(API_URL + 'banners')
        .then((res) => {
            this.setState({banner : res.data})
        })
        .catch((err) => console.log(err))
    }

    RenderBanner = () => {
        return this.state.banner.map( (item, index) => {
            return (
                <div className = 'banner-img-container' key  = {index}>
                    <img src = {item} alt = 'banner-img' id = 'banner-img'/>
                </div>
            )
    })}
    render() {
        const settings = {
            dots: false,
            fade : true,
            arrows : false,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            speed: 3000,
            autoplaySpeed: 3000,
            cssEase: "linear",
        }
        return (
            <div className = 'banner-container'>
                {/* <h1 style = {{color : 'white'}}>Trending</h1> */}
                <Slider {...settings} >
                    {this.RenderBanner()}
                </Slider>
            </div>
        )
    }
}

export default Banner
