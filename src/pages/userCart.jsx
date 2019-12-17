import React from 'react'
import { Table, TableBody, TableHead, TableRow, TableCell, Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { theme } from '../style/theme'
import Axios from 'axios'
import API_URL from '../supports'
import '../style/cart.css'

const Cell = withStyles({
    root : {
        backgroundColor : theme.palette.primary.main,
        color : theme.palette.secondary.text,
        borderColor : theme.palette.primary.light,
        textTransform : 'uppercase'
        // textAlign : 'left'
    }
})(TableCell)

const BodyCell = withStyles({
    root : {
        backgroundColor : theme.palette.primary.light,
        color : theme.palette.secondary.text,
        borderColor : theme.palette.primary.light
    }
})(TableCell)


class UserCart extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            cart : []
        }
    }

    componentDidMount () {
        Axios.get(API_URL + `user/${localStorage.getItem('id')}`)
        .then((res) => {
            this.setState({cart : res.data.cart})
        })
        .catch((err) => console.log(err))
    }

    Head = () => {
        return (
            <TableHead>
                <TableRow>
                    <Cell>No</Cell>
                    <Cell>Title</Cell>
                    <Cell>Seats</Cell>
                    <Cell>Ticket Amount</Cell>
                    <Cell>Total Price</Cell>
                    <Cell style ={{textAlign : "center"}}>Action</Cell>
                </TableRow>
            </TableHead>
        )
    }

    Body = () => {
        return this.state.cart.map((item, index) => {
            return (
                <TableRow key = {index}>
                    <BodyCell>{index+1}</BodyCell>
                    <BodyCell>{item.title}</BodyCell>
                    <BodyCell>{item.seatsCode.join(' , ')}</BodyCell>
                    <BodyCell>{item.ticketAmount}</BodyCell>
                    <BodyCell>{item.totalPrice}</BodyCell>
                    <BodyCell style ={{textAlign : "center"}}>
                        <Button variant = 'contained' id = 'btn-cart-cancel' onClick = {() => this.cancelCart(index)}> Cancel </Button>
                    </BodyCell>
                </TableRow>
            )
        })
    }

    RenderTable = () => {
        return (
            <Table>
                {this.Head()}
                <TableBody>
                    {this.Body()}
                </TableBody>
            </Table>
        )
    }

    cancelCart = (index) => {
        let cart = this.state.cart
        cart.splice(index, 1)
        this.setState({cart : cart})
        
    }

    render () {
        return (
            <div className = 'cart-container'>
                <h1>Hello : {localStorage.getItem('username') + '!'}</h1>
                <div className = 'table-user-cart'>
                    {this.RenderTable()}
                </div>
                <Button variant = 'contained' id = 'check-out-btn'>Check Out</Button>
            </div>
        )
    }
}

export default UserCart