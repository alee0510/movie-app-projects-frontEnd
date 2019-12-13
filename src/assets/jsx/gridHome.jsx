import React from 'react'
import Axios from 'axios'
import API_URL from '../supports'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import { Button } from '@material-ui/core'

import '../style/gridHome.css'

class GridHome extends React.Component {
    constructor (props) {
        super (props)
        this.state = {
            movies : [],
            pop : false,
            over : false,
            overLock : true
        }
    }

    componentDidMount () {
        Axios.get(API_URL + 'movies')
        .then ((res) => {
            this.setState({movies : res.data}, ( )=> {
                console.table(this.state.movies)
            })
        })
        .catch ((err) => console.log(err))
    }

    // togglePop = () => {
    //     this.setState({pop : !this.state.pop, overLock : false}, () => {
    //         console.info('toogle pop value : ', this.state.pop)
    //     })
    // }
    
    renderCard = () => {
        return this.state.movies.map( (item, index) => {
            return (
                <Grid item key = {index} id = 'gridItems'>
                    <Card id = 'card' 
                        // onClick = {this.togglePop} 
                    >
                        <img src = {item.poster} alt = 'poster-img' id = 'img'/>
                        <div id = 'overlay'></div>
                        <div id = 'title' > {item.title}</div>
                    </Card>
            </Grid>
        )
    }) }

    render () {
        
        return (
            <div >
                <Grid container spacing={2} id = 'gridContainer'>
                    {this.renderCard()}
                </Grid>
            </div>
        )
    }
}

export default GridHome