import React from 'react'
import Button from '@material-ui/core/Button'
import EventSeatIcon from '@material-ui/icons/EventSeat'
import LocalMallIcon from '@material-ui/icons/LocalMall'
import RefreshIcon from '@material-ui/icons/Refresh'
import AlertDialog from '../components/alertDialog'

// import table
import {Table, TableBody, TableCell, TableHead, TableRow, withStyles } from '@material-ui/core';

// style
import '../style/seat.css'

// redux
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { logIn } from '../actions'
import API_URL from '../supports';
import Axios from 'axios'

var seats = 100

function Seat (props) {
    const red = '#F50057'
    const blue = '#304ffe'
    const white = '#f2f2f2'
    const style = {
        color : props.cell === 3 ? red : props.cell === 2 ? blue : white,
        cursor : 'pointer',
        fontSize : '18pt',
    }
    // console.log('cell ' + props.cell)
    // console.log(style.color)

    if (props.cell === 3) {
        return (
            <Cell>
                <EventSeatIcon style ={style} fontSize = 'small'/>
            </Cell>
        )
    } else {
        return (
            <Cell onClick ={() => props.handleClick(props.row, props.col)}>
                <EventSeatIcon style = {style} fontSize = 'small'/>
            </Cell>
        )
    }
}

function SeatRows (props) { // 20 seats
    let cells = []
    for (let i = 0; i < seats/5; i++) {
        cells.push(
        <Seat key = {i} 
            cell = {props.cells[i]} 
            row = {props.row} 
            handleClick = {props.handleClick}
            col = {i}
            />)
    }
    return cells
}
function NumCell (props) {
    let num = []
    for(let i = 0; i < seats/5; i++){
        num.push(<Cell key = {i}>{i+1}</Cell>)
    }
    return num
}

function SeatBoard (props) {
    let rows = []
    let str = 'ABCDE'
    for (let i = 0; i < seats/20; i++) {
        rows.push(
            <Row key = {i}>
                <Cell>{str[i]}</Cell>
                <SeatRows   
                    row = {i} 
                    cells = {props.cells[i]} 
                    handleClick = {props.handleClick}/>
            </Row>)
    }
    return (
        <Table>
            <TableHead>
                {rows}
            </TableHead>
            <TableBody>
                <Row>
                    <Cell></Cell>
                    <NumCell/>
                </Row>
            </TableBody>
        </Table>
    )
}


const Cell = withStyles ({
    root : {
        color : 'white',
        border : 'none',
        textAlign : 'center',
        padding : 3
    }
})(TableCell)


const Row = withStyles ({
    root : {
        height : 'auto'
    }
})(TableRow)

class SeatReservation extends React.Component {
    constructor(props) {
        super(props)
        var cells = []
        for (let i = 0; i < seats/20; i++){
            cells.push(new Array(seats/5).fill(1))
        }
        this.state = {
            cells : cells,
            bookedSeat : [],
            choosenSeat : [],
            price : 0,
            count : 0,
            seatsCode : [], 
            open : false,
            isBooked : false
        }
    }
    
    componentDidMount () {
        Axios.get(API_URL + `movies/${this.props.location.state.id}`)
        .then((res) => {
            this.setState({bookedSeat : res.data.booked})
            let temp  = []
            for (let i = 0; i < seats/20; i++){
                temp.push(new Array(seats/5).fill(1))
            }
            for (let i = 0; i < res.data.booked.length; i++){
                temp[res.data.booked[i][0]][res.data.booked[i][1]] = 3
            }
            this.setState({cells : temp})
        })
    }

    findIndexPreviousSeat = (row, col) => {
        let {choosenSeat} = this.state
        for (let i = 0; i < choosenSeat.length; i ++) {
            if (choosenSeat[i][0] === row && choosenSeat[i][1] === col) {
                console.log('previous index : ' + i)
                return i
            }
        }
    }

    handleClick = (row, col) => {
        let {cells, choosenSeat, price, count, seatsCode} = this.state
        let temp = []
        let str = 'ABCDE'
        console.info('selected row : ', row, 'selected cell : ', col)
        
        for(let i = 0; i < seats/20; i++) {
            temp.push(cells[i].slice())
        }

        if (temp[row][col] === 2) {
            temp[row][col] = 1
            // find index of previous selected seat
            let item = this.findIndexPreviousSeat(row, col)
            console.log('item index to delete : ' + item)
            
            choosenSeat.splice(item, 1)
            seatsCode.splice(item, 1)
            this.setState({
                cells: temp, 
                choosenSeat: choosenSeat,
                price : price - 5,
                count : count - 1,
                seatsCode : seatsCode} 
                // () => {console.table(choosenSeat)}
            )
        } else {
            temp[row][col] = 2
            this.setState({
                cells: temp, 
                choosenSeat : [...choosenSeat, [row, col]],
                price : price + 5,
                count : count + 1,
                seatsCode : [...seatsCode, [str.charAt(row)+(col+1)]]}
                // () => {console.table(choosenSeat)}
            )
        }
    }

    findIndexOfMovie = (title) => {
        let cart = this.props.cart
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].title === title) {
                return i
            }
        }
    }

    isMovieHasSameTitle = (title) => {
        let cart = this.props.cart
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].title === title) {
                return true
            }
        }
        return false
    }

    AddToCart = () => {
        let cart = this.props.cart
        let userID = localStorage.getItem('id')
        let {bookedSeat, choosenSeat, count, price, seatsCode} = this.state
        let movieDetails = this.props.location.state
        let userCart = {
            title : movieDetails.title,
            totalPrice : price,
            seatsCor : choosenSeat, // seat coordinates
            seatsCode : seatsCode,
            ticketAmount : count
        }

        let same = this.isMovieHasSameTitle(movieDetails.title)
        console.info('is cart\'s movie has same title : ', same)
        console.info('cart length : ', cart.length)

        if (count === 0) {
            console.log('user not choose the seat yet!')
        } else {
            if (cart.length === 0 || !same) { // our cart is empty
                console.log('cart is empty or cart has no movies with same title')
                cart.push(userCart)
                bookedSeat.push(...choosenSeat)
                console.table(cart)
                console.table(bookedSeat)
                Axios.patch(API_URL + `user/${userID}`, {cart : cart})
                .then((res) => {
                    Axios.get(API_URL + `user/${userID}`)
                    .then((res) => {
                        Axios.patch(API_URL + `movies/${movieDetails.id}`, {booked : bookedSeat})
                        .then((res) => console.log(res.data))
                        .catch((err) => console.log(err))
                        this.props.logIn(res.data) // update our global state user cart
                    })
                    .catch((err) => console.log(err))
                })
                .catch((err) => console.log(err))
            } else if (same){
                console.log('cart is has movie with same title')
                let index = this.findIndexOfMovie(movieDetails.title)
                cart[index].totalPrice += price
                cart[index].seatsCor.push(...choosenSeat)
                cart[index].seatsCode.push(...seatsCode)
                cart[index].ticketAmount += count
                bookedSeat.push(...choosenSeat)
                console.table(cart)
                Axios.patch(API_URL + `user/${userID}`, {cart : cart})
                .then((res) => {
                    Axios.get(API_URL + `user/${userID}`)
                    .then((res) => {
                        Axios.patch(API_URL + `movies/${movieDetails.id}`, {booked : bookedSeat})
                        .then((res) => console.log(res.data))
                        .catch((err) => console.log(err))
                        this.props.logIn(res.data)
                    })
                    .catch((err) => console.log(err))
                })
                .catch((err) => console.log(err))
            }
        }
    }

    Refresh = () => {
        let choosenSeat = this.state.choosenSeat
        let cells = this.state.cells
        for (let i = 0; i < choosenSeat.length; i++) {
            cells[choosenSeat[i][0]][choosenSeat[i][1]] = 1
        }
        this.setState({cells : cells, count : 0, price : 0, seatsCode : []})
        
    }

    handelDialogOpen = () => {
        if (this.state.count === 0) {
            return null
        } else {
            this.setState({open : true})
        }
    }

    handleDialogClose = () => {
        this.setState({open : false})
        window.location.reload()
    }

    Booked = () => {
        this.setState({isBooked : true})
    }
    
    render () {
        // console.table(this.state.cells)
        let movieDetails = this.props.location.state
        let {count, price, seatsCode, isBooked, open} = this.state

        // console.table(moviesDeatils)
        // console.table(this.state.choosenSeat)
        console.info('price : ', price, 'count : ', count)
        console.table(seatsCode)

        if (isBooked) {
            return <Redirect to = '/userCart'></Redirect>
        }

        return (
            <div className = 'booked-seat-container'>
                <div className = 'booked-movies-detail'>
                    <div className = 'booked-img-container'>
                        <img src = {movieDetails.poster} alt = 'movie-poster' id = 'booked-img-poster'/>
                    </div>
                    <div className = 'booked-info'>
                        <h3>Title : {movieDetails.title}</h3>
                        <h4>Director : {movieDetails.director}</h4>
                        <h4>Casts : {movieDetails.casts.join(', ')}</h4>
                    </div>
                </div>
                <div className = 'booked-seat'>
                    <h1>Choosen seats : {seatsCode.sort().join(' , ')}</h1>
                    <h3> Ticket Price : $ {price}.00</h3>
                    <h3> Total Amount : {count}</h3>
                    <div id = 'screen'>
                        screen
                    </div>
                    <div className = 'seat-container'>
                        <SeatBoard 
                        cells = {this.state.cells} 
                        handleClick = {this.handleClick}
                        booked = {this.state.booked}
                        />   
                    </div>
                    <div id = 'booked-info'>
                        <div id = 'avaiable'>
                            <EventSeatIcon id = 'seat-icon'/>
                            <span>Avaiable</span>
                        </div>
                        <div id = 'booked'>
                            <EventSeatIcon id = 'seat-icon'/>
                            <span>Booked</span>
                        </div>
                        <div id = 'choosen'>
                            <EventSeatIcon id = 'seat-icon'/>
                            <span>Choosen</span>
                        </div>
                    </div>
                    <div id = 'btn-booked-container'>
                        <Button
                            variant="contained"
                            color="default"
                            onClick={this.Refresh}
                            startIcon={<RefreshIcon/>}
                            id = 'refresh-btn'
                        >
                            Refresh
                        </Button>
                        <Button
                            variant="contained"
                            color="default"
                            onClick={(event) => {this.AddToCart(); this.handelDialogOpen();}}
                            startIcon={<LocalMallIcon/>}
                            id = 'booked-btn'
                        >
                            Buy Now
                        </Button>
                        <AlertDialog
                        open = {open}
                        close = {this.handleDialogClose}
                        title = 'Your booked is success'
                        contents = 'Plese select yes to see your cart and payment process and no if you want to select seat again'
                        hanldeButtonOne = {this.handleDialogClose}
                        ButtonOneName = 'No'
                        handleButtonTwo = {this.Booked}
                        ButtonTwoName = 'Yes, Proccess'
                        displayOne = 'none'
                        displayTwo = 'block'
                        />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStore = (state) => {
    return {
        cart : state.login.cart
    }
}

export default connect(mapStore, {logIn})(SeatReservation)