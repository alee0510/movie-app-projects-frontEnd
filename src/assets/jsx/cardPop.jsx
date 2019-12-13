import React from 'react'
import Card from '@material-ui/core/Card'

import { poster } from '../assets'
import './cardPop.css'
import { Button } from '@material-ui/core'

import { theme } from '../style/theme'

class CardPop extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            pop : false,
            over : false,
            overLock : true
        }
    }
    
    togglePop = () => {
        this.setState({pop : !this.state.pop, overLock : false}, () => {
            console.info('toogle pop value : ', this.state.pop)
        })
    }
    mouseOver = () => {
        this.setState({over : true}, () => {
            console.info('mouse over value : ', this.state.over)
        })
    }

    mouseLeave = () => {
        this.setState({over : false}, () => {
            console.info('mouse over value : ', this.state.over)
        })
    }

    render () {
        let pop = this.state.pop
        let over = this.state.over
        let overLock = this.state.overLock
        const style = {
            card : {
                maxWidth: pop ? '50%':'13%',
                backgroundColor : theme.palette.primary.main,
                height : pop ? '70%' : '',
                zIndex : 5,
                overflow : 'hidden',
                display : pop ? 'flex' : 'flex',
                flexDirection : 'row',
                justifyContent : pop ? 'space-between' : 'center',
                borderRadius : '35px',
                position : pop ? 'fixed' : '',
                margin : pop ? 'auto 25%' : '',
                // left: '25%',
                scale : over && overLock ? '1.1' : '1'
            },
            media : {
                width : pop ? '50%' : '100%',
                objectFit : 'cover'
            },
            overlay : {
                zIndex : 3,
                opacity : over && overLock ? '0.7' : '0.0',
                scale : over && overLock ? '1.1' : '1'
            },
            title : {
                zIndex : 4,
                opacity : over && overLock? '1.0' : '0.0',
                scale : over && overLock? '1.1' : '1'
            },
            descrip : {
                display : pop ? 'block' : 'none'
            }
        }

        return (
            <Card style = {style.card} id = 'card' 
                onClick = {this.togglePop} 
                onMouseEnter = {this.mouseOver} 
                onMouseLeave = {this.mouseLeave}
            >
                <img  style = {style.media} src = {poster} alt = 'poster-img' id = 'img'/>
                <div id = 'overlay' style = {style.overlay}></div>
                <div id = 'title' style = {style.title}> </div>
                <div className = 'description' style = {style.descrip}>
                    <div id = 'titlePop'>Title : </div>
                    <div id = 'genre'>Genre : </div>
                    <div id = 'sinopsis'>Sinopsis : <br/></div>
                    <div id = 'button'>
                        <Button id = 'cancel'>Cancel</Button>
                        <Button variant="contained" id = 'buynow'>Buy Now</Button>
                    </div>
                </div>
            </Card>
        )

    }
}

export default CardPop