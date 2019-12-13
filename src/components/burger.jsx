import React from 'react'
import '../style/burger.css'

class Burger extends React.Component {
    constructor (props) {
        super (props)
        this.state = {
            open : false
        }
    }

    toggle = () => {
        this.setState ( {open : !this.state.open}, () => {
            console.log(this.state.open)
        })
    }

    render () {
        const top = {
            transform : this.state.open ? 'translateY(11px) translateX(0px) rotate(45deg)' 
            : 'translateY(0px)'
        }
        const middle = {
            width : this.state.opem ? '0px' : '60%',
            opacity: this.state.open ? 0 : 1
        }

        const bottom = {
            transform : this.state.open ? 'translateY(-11px) translateX(0px) rotate(-45deg)' 
            : 'translateY(0px)',
            width : this.state.open ? '100%' : '80%'
        }

        return (
            <div className = "burger" onClick = {this.toggle}>
                <div id = 'top' style = {top}></div>
                <div id = 'middle' style = {middle}></div>
                <div id = 'bottom' style = {bottom}></div>
            </div>
        )
    }
}

export default Burger