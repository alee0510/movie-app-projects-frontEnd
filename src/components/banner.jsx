import React, { Component } from "react"
import Slider from "react-slick"

import '../style/banner.css'

import { connect } from 'react-redux'

class Banner extends Component {

    RenderBanner = () => {
        return this.props.banners.map( (item, index) => {
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

const mapStore = (state) => {
    return {
        banners : state.storeBanner.banner
    }
}
export default connect(mapStore)(Banner)
