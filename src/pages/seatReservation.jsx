import React from 'react'
import Button from '@material-ui/core/Button'
import EventSeatIcon from '@material-ui/icons/EventSeat'
// import Icon from '@material-ui/core/Icon'
import LocalMallIcon from '@material-ui/icons/LocalMall'

// import table
import {Table, TableBody, TableCell, TableHead, TableRow, withStyles} from '@material-ui/core';

// style
import '../style/seat.css'

var seats = 100

function Seat (props) {
    // const red = '#F50057'
    const blue = '#2979ff'
    const white = '#f2f2f2'
    const style = {
        color : props.cell === 2 ? blue : white,
        cursor : 'pointer'
    }
    // console.log('cell ' + props.cell)
    // console.log(style.color)
    return (
        <Cell onClick ={() => props.handleClick(props.row, props.col)}>
            <EventSeatIcon style = {style} fontSize = 'large'/>
        </Cell>
    )
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
        padding : 7
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
            count : 0
        }
    }
    
    findIndexPreviousSeat = (row, col) => {
        let {choosenSeat} = this.state
        for (let i = 0; i < choosenSeat.length; i ++) {
            let indexCol = 0
            if (choosenSeat[i][0] === row && choosenSeat[i][1] === col) {
                console.log('previous index : ' + i)
                return indexCol = i
            }
        }
    }

    handleClick = (row, col) => {
        let {choosenSeat} = this.state
        // initial index of previous selected seat in choosenSeat
        
        let temp = []
        console.info('selected row : ', row, 'selected cell : ', col)
        for(let i = 0; i < seats/20; i++) {
            temp.push(this.state.cells[i].slice())
        }
        if (temp[row][col] === 2) {
            temp[row][col] = 1
            // find index of previous selected seat
            let item = this.findIndexPreviousSeat(row, col)
            console.log('item index to delete : ' + item)
            choosenSeat.splice(item, 1)
            this.setState({cells: temp, choosenSeat: choosenSeat}, () => {
                console.table(this.state.choosenSeat)
            })
        } else {
            temp[row][col] = 2
            this.setState({cells: temp, choosenSeat : [...this.state.choosenSeat, [row, col]]}, () => {
                console.table(this.state.choosenSeat)
            })
        }
    }
    
    render () {
        // console.table(this.state.cells)
        return (
            <div>
                <h1 style = {{color : 'white'}}>Choose your seats : </h1>
                <div className = 'seat-container'>
                    <div className = 'seats'>
                        <SeatBoard 
                        cells = {this.state.cells} 
                        handleClick = {this.handleClick}
                        booked = {this.state.booked}
                        />   
                    </div>
                </div>
                <Button
                    variant="contained"
                    color="default"
                    // className={classes.button}
                    startIcon={<LocalMallIcon/>}
                >
                    Book Now
                </Button>
            </div>
        )
    }
}

export default SeatReservation