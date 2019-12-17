import React from 'react'
import { Table, TableBody, TableHead, TableRow, TableCell, Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { theme } from '../style/theme'
import Axios from 'axios'
import { connect } from 'react-redux'
import API_URL from '../supports'
import '../style/cart.css'
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied'

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
                    <BodyCell>$ {item.totalPrice}.00</BodyCell>
                    <BodyCell style ={{textAlign : "center"}}>
                        <Button variant = 'contained' id = 'btn-cart-cancel' onClick = {() => this.CancelCart(index)}> Cancel </Button>
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

    CancelCart = (index) => {
        console.log('index selected : ' + index)
        let cart = this.state.cart
        let seatCoordinate = cart[index].seatsCor // seat coordinate
        // console.table(cart)
        // console.table(seatCoordinate)
        Axios.get(API_URL + `movies/?title=${cart[index].title}`)
        .then((res) => {
            let tempBooked = res.data[0].booked
            cart.splice(index, 1)
            this.setState({cart : cart})
            let movID = res.data[0].id

            // // filter booked seat at data base movie to macth with seat coordinate
            for (let i = 0 ; i < seatCoordinate.length; i++){
                tempBooked = tempBooked.filter((item) => item.join('') !== seatCoordinate[i].join(''))
                console.log('iterate at ' +  i + 'th')
                console.log(seatCoordinate[i].join(''))
                console.log(tempBooked)
            }
            Axios.patch(API_URL + `user/${localStorage.getItem('id')}`, {cart : cart}) // update our database cart
            .then((res) => {
                Axios.patch(API_URL + `movies/${movID}`, {booked : tempBooked}) // update our movie's booked seat data base
                .then((res) => console.log('delete booke success'))
                .catch((err) => console.log(err))
            })
            .catch((err) => console.log(err))
        })
        .catch((err) => console.log(err))
    }

    CheckOut = () => {
        return console.log('checkout')
    }

    render () {
        // if (this.props.username) {
            return (
                <div className = 'cart-container'>
                    <h1>Hello : {localStorage.getItem('username') + '!'}</h1>
                    <div className = 'table-user-cart'>
                        {this.RenderTable()}
                    </div>
                    <Button variant = 'contained' id = 'check-out-btn' onClick = {this.CheckOut}>Check Out</Button>
                </div>
            // )
        // } else {
        //     return (
        //         <div className = 'cart-user-not-found'>
        //             <div className = 'cart-user-not-found-contents'>
        //                 <SentimentVeryDissatisfiedIcon fontSize='large'/>
        //                 <p>Sorry, please login to see your chart . . . </p>
        //             </div>
        //         </div>
        //     )
        // }
            )
    }
}

const mapStore = (state) => {
    return {
        username : state.login.username
    }
}

export default connect(mapStore)(UserCart)