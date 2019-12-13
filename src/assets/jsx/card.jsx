import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'

import { poster } from '../assets'
import '../style/card.css'

const useStyles = makeStyles ({
    card: {
        maxWidth: '13%',
        overflow : 'hidden',
        display : 'flex',
        flexDirection : 'row',
        justifyContent : 'center',
        borderRadius : '35px',
        position : 'relative'
    },
    media: {
        width : '100%'
    }
})

export default function MediaCard () {
    const classes = useStyles();

    return (
        <Card className = {classes.card} id = 'card'>
            <img className = {classes.media} src = {poster} alt = 'poster-img'/>
            <div id = 'overlay' ></div>
            <div id = 'title'> On Your Wedding Day </div>
        </Card>
    )
}
