import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
// import tileData from './tileData';
import Axios from 'axios';
import API_URL from '../supports';

const GridListStyled = withStyles({
    root : {
        width: '90%',
        // height: '85vh'
    }
})(GridList)

class HomeGrid extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            imageList : []
        }
    }

    componentDidMount () {
        Axios.get(API_URL + 'banners')
        .then((res) => {
            this.setState({imageList : res.data}, () => console.table(res.data))
        })
        .catch((err) => console.log(err))
    }

    render () {
        const style = {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            // overflow: 'hidden',
        }
        return (
            <div style = {style}>
                <GridListStyled cellHeight={300} cols={6}>
                    {this.state.imageList.map( (i, index) => (
                        <GridListTile key={index} cols={2}>
                            <img src={i} alt='banner' />
                        </GridListTile>
                    ))}
                </GridListStyled>
            </div>
        )
    }
}

export default HomeGrid