import React from 'react';
import { Paper, Table, TableBody, TableCell, TableHead, TableRow,
    TableFooter, TablePagination } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { theme } from '../style/theme'
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied'

import '../style/userTransaction.css'
import { barcode } from '../assets'

import API_URL from '../supports';
import Axios from 'axios'
import { connect } from 'react-redux'
import { checkOut } from '../actions'

// styling cell and row
const Cell = withStyles({
    root : {
        backgroundColor : theme.palette.primary.light,
        color : theme.palette.secondary.text,
        borderColor : '#f2f2f2',
    }
})(TableCell)

const HeadCell = withStyles({
    root : {
        backgroundColor : theme.palette.primary.main,
        color : theme.palette.secondary.text,
        borderColor : '#f2f2f2',
        textTransform : 'uppercase'
    }
})(TableCell)

const Row = withStyles({
    root : {
        backgroundColor : theme.palette.primary.main,
        borderColor : '#f2f2f2',
    }
})(TableRow)

class UserHistorTransaction extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            transactionsHistory : [],
            page : 0,
            rowsPerPage : 5
        }
    }

    componentDidMount () {
        Axios.get(API_URL + `transactions/?userID=${localStorage.getItem('id')}`)
        .then((res) => {
            this.setState({transactionsHistory : res.data})
            this.props.checkOut(res.data)
        })
        .catch((err) => console.log(err))
    }

    Head = () => {
        return (
            <TableHead>
                <TableRow>
                    <HeadCell>No</HeadCell>
                    <HeadCell>Date & Time</HeadCell>
                    <HeadCell>Total</HeadCell>
                    <HeadCell>Price</HeadCell>
                    <HeadCell>Ticket's Details</HeadCell>
                </TableRow>
            </TableHead>
        )
    }

    Body = () => {
        let {page, rowsPerPage, transactionsHistory} = this.state
        return (
            <TableBody>
                {
                    (rowsPerPage > 0 
                        ? transactionsHistory.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) 
                        : transactionsHistory
                    ).map((item, index) => {
                        return (
                            <TableRow key = {item.id}>
                                <Cell>{index+1}</Cell>
                                <Cell>{item.date} / {item.time}</Cell>
                                <Cell>{item.total} Tickets</Cell>
                                <Cell>$ {item.price} .00</Cell>
                                <Cell style = {{width : '380px'}}>
                                    {item.details.map((val, index) => {
                                        return (
                                            <div id = 'user-ticket-box' key = {index}>
                                                <div id = 'user-left-ticket-box'>
                                                    <img src = {barcode} alt = 'user-barcode' width = '75px'/>
                                                </div>
                                                <div id = 'user-right-ticket-box'>
                                                    <p id = 'user-his-title'>{val.title}</p>
                                                    <p>Price : ${val.totalPrice}.00</p>
                                                    <p>{val.ticketAmount} Tickets</p>
                                                    <p>Seat : {val.seatsCode.join(' , ')}</p>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </Cell>
                            </TableRow>
                        )
                    })
                }
            </TableBody>
        )
    }

    renderTable = () => {
        return (
            <div className ='user-table-wrapper'>
                <Table stickyHeader aria-label="sticky table" className = 'table'>
                    {this.Head()}
                    {this.Body()}
                </Table>
            </div>
        )
    }

    // handle click on table pagenation
    handleChangePage = (event, newPage) => {
        this.setState({page : newPage})
    }
    
    handleChangeRowsPerPage = (event) => {
        // let {rowsPerPage} = this.state
        this.setState({page : 0, rowsPerPage : parseInt(event.target.value, 10)})
    }

    render () {
        let {page, rowsPerPage, transactionsHistory} = this.state
        if(this.props.username) {
            return (
                <div className = 'user-transaction-history-container'>
                    <h2>My Transaction History</h2>
                    <Paper className = 'table-container' style = {{backgroundColor : theme.palette.primary.main}}>
                        <Table>
                            {this.renderTable()}
                            <TableFooter>
                                <Row>
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                        // colSpan={3}
                                        count={transactionsHistory.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        SelectProps={{
                                        inputProps: { 'aria-label': 'rows per page ', color : 'white' },
                                        native: true,
                                        }}
                                        style = {{color : 'white'}}
                                        onChangePage={this.handleChangePage}
                                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                    />
                                </Row>
                            </TableFooter>
                        </Table>
                    </Paper>
                </div>
            )
        } else {
            return (
                <div className = 'trans-user-not-found'>
                    <div className = 'trans-user-not-found-contents'>
                        <SentimentVeryDissatisfiedIcon fontSize='large'/>
                        <p>Sorry, please login to see your ticket . . . </p>
                    </div>
                </div>
            )
        }
    }
}

const mapStore = (state) => {
    return {
        username : state.login.username
    }
}

export default connect(mapStore, {checkOut}) (UserHistorTransaction)