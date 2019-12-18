import React from 'react';
import { Paper, Table, TableBody, TableCell, TableHead, TableRow,
    TableFooter, TablePagination } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { theme } from '../style/theme'

import '../style/adminTransaction.css'
import API_URL from '../supports';
import Axios from 'axios'

// styling cell and row
const Cell = withStyles({
    root : {
        backgroundColor : theme.palette.primary.light,
        color : theme.palette.secondary.text,
        borderColor : theme.palette.primary.light,
    }
})(TableCell)

const HeadCell = withStyles({
    root : {
        backgroundColor : theme.palette.primary.main,
        color : theme.palette.secondary.text,
        borderColor : theme.palette.primary.light
    }
})(TableCell)

const Row = withStyles({
    root : {
        backgroundColor : theme.palette.primary.main,
        borderColor : theme.palette.primary.light
    }
})(TableRow)

class AdminHistoryTransaction extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            transactionsHistory : [],
            page : 0,
            rowsPerPage : 5
        }
    }

    componentDidMount () {
        Axios.get(API_URL + `transactions`)
        .then((res) => this.setState({transactionsHistory : res.data}))
        .catch((err) => console.log(err))
    }

    Head = () => {
        return (
            <TableHead>
                <TableRow>
                    <HeadCell>No</HeadCell>
                    <HeadCell>User ID</HeadCell>
                    <HeadCell>Date & Time</HeadCell>
                    <HeadCell>Total</HeadCell>
                    <HeadCell>Price</HeadCell>
                    <HeadCell>Details</HeadCell>
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
                                <Cell>{item.userID}</Cell>
                                <Cell>{item.date} / {item.time}</Cell>
                                <Cell>{item.total} Tickets</Cell>
                                <Cell>$ {item.price}.00</Cell>
                                <Cell>
                                    {item.details.map((val, index) => {
                                        return (
                                            <div id = 'ticket-box' key = {index}>
                                                <p id = 'his-title'>{val.title}</p>
                                                <p>Pice : ${val.totalPrice}.00</p>
                                                <p>{val.ticketAmount} Tickets</p>
                                                <p>Seat : {val.seatsCode}</p>
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
            <div className ='table-wrapper'>
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
        return (
            <div className = 'admin-transaction-history-container'>
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
    }
}

export default AdminHistoryTransaction