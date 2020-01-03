import React from 'react'
import { Table, TableHead, TableBody, TableRow, TableCell, withStyles } from '@material-ui/core'
import EventSeatIcon from '@material-ui/icons/EventSeat'

var seats = [20, 5]

// material custom 
const Cell = withStyles({
    root : {
        color : 'white',
        border : 'none',
        textAlign : 'center',
        padding : 3
    }
})(TableCell)

const Row = withStyles({
    root : {
        height : 'auto'
    }
})(TableRow)

function Seat (props) {
    // seat color code
    const red = '#F50057'
    const blue = '#304ffe'
    const white = '#f2f2f2'
    const style = {
        color : props.cell === 3 ? red : props.cell === 2 ? blue : white,
        cursor : 'pointer',
        fontSize : '18pt',
    }
    if (props.cell === 3) { // seat already booked
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

function SeatRow (props) {
    let cells = []
    for (let i = 0; i < seats[0]; i++) {
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
    for(let i = 0; i < seats[0]; i++){
        num.push(<Cell key = {i}>{i+1}</Cell>)
    }
    return num
}

function SeatBoard (props) {
    let rows = []
    let str = 'ABCDE'
    for (let i = 0; i < seats[1]; i++) {
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

export default SeatBoard