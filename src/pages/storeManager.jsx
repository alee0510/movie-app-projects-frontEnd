import React from 'react';
import { Paper, Table, Button, Dialog, DialogTitle, DialogContent, 
    DialogContentText, DialogActions, TextField, TableBody, TableCell, TableHead, TableRow,
    TableFooter, TablePagination } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { theme } from '../style/theme'
import AddIcon from '@material-ui/icons/Add'

import '../style/store.css'
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

class StoreManager extends React.Component {
    constructor (props) {
        super (props)
        this.state = {
            movies : [],
            selectedID : null,
            open : false,
            alert : false,
            deleteId : null,
            page : 0,
            rowsPerPage : 5
        }
    }
    
    // get data from local server using user define methods
    componentDidMount = () => {
        Axios.get(API_URL + 'movies')
        .then ( (res) => {
            this.setState ({ movies :  res.data }) // data properties from axios server
        })
        .catch ( (err) => console.log(err) )
    }

    // handle click on table pagenation
    handleChangePage = (event, newPage) => {
        this.setState({page : newPage})
    }

    handleChangeRowsPerPage = (event) => {
        // let {rowsPerPage} = this.state
        this.setState({page : 0, rowsPerPage : parseInt(event.target.value, 10)})
    }

    TabHead = () => {
        return (
            <TableHead id = 'head' >
                <TableRow >
                    <HeadCell align = 'center' >No</HeadCell>
                    <HeadCell align = 'left' >Poster</HeadCell>
                    <HeadCell align = 'left' >Title</HeadCell>
                    <HeadCell align = 'left' >Director</HeadCell>
                    <HeadCell align = 'left' >Casts</HeadCell>
                    <HeadCell align = 'left' >Genre</HeadCell>
                    <HeadCell align = 'left' >Synopsis</HeadCell>
                    <HeadCell align = 'center' >Action</HeadCell>
                </TableRow>
            </TableHead>
        )
    }
    
    TabBody = () => {
        let {page, rowsPerPage, movies} = this.state
        // const emptyRows = rowsPerPage - Math.min(rowsPerPage, movies.length - page * rowsPerPage)
        return (
            <TableBody>
                {
                    (rowsPerPage > 0 
                        ? movies.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) 
                        : movies
                    ).map((item, index) => {
                        if (this.state.selectedID === item.id) {
                            return (
                                <TableRow hover key = {item.id}>
                                    <Cell>#</Cell>
                                    <Cell>
                                        <TextField autoFocus variant= 'filled' inputRef = {editPosterUrl => this.editPosterUrl = editPosterUrl}/>
                                    </Cell>
                                    <Cell>
                                        <TextField autoFocus variant= 'filled' inputRef = {editTitle => this.editTitle = editTitle}/>
                                    </Cell>
                                    <Cell>
                                        <TextField autoFocus variant= 'filled' inputRef = {editDirector => this.editDirector = editDirector}/>
                                    </Cell>
                                    <Cell>
                                        <TextField autoFocus variant= 'filled' inputRef = {editCasts => this.editCasts = editCasts}/>
                                    </Cell>
                                    <Cell>
                                        <TextField autoFocus variant= 'filled' inputRef = {editGenre => this.editGenre = editGenre}/>
                                    </Cell>
                                    <Cell>
                                        <TextField autoFocus variant= 'filled' inputRef = {editSynopsis => this.editSynopsis = editSynopsis}/>
                                    </Cell>
                                    <Cell align = 'center'>
                                        <Button variant = 'contained' id = 'btn-cancel-store' onClick = {() => this.Cancel(item.id)}>Cancel</Button>
                                        <Button variant = 'contained' id = 'btn-done-store' onClick = {() => this.Done(item.id)} >Done</Button>
                                    </Cell>
                                </TableRow>
                            )
                        } else {
                            return (
                                <TableRow hover key = {item.id}>
                                    <Cell align = 'center' style = {{width : '2%'}}>{index+1}</Cell>
                                    <Cell style = {{width : '5%'}}><img src = {item.poster} alt = 'poster' width = '50px'/></Cell>
                                    <Cell style = {{width : '15%'}}>{item.title}</Cell>
                                    <Cell style = {{width : '8%'}}>{item.director}</Cell>
                                    <Cell style = {{width : '20%'}}>{item.casts.length > 2 ? item.casts.join(' , ') : item.casts}</Cell>
                                    <Cell style = {{width : '10%'}}>{item.genre.length > 2 ? item.genre.join(' , ') : item.genre}</Cell>
                                    <Cell style = {{width : '15%'}}>{item.plot.split(' ', 5).join(' ') + '...'}</Cell>
                                    <Cell align = 'center' style = {{width : '20%'}}>
                                        <Button variant = 'contained' id = 'btn-edit-store' onClick = {() => this.Edit(item.id)}>Edit</Button>
                                        <Button variant = 'contained' id = 'btn-delete-store' onClick = {() => this.alertOpen(item.id)} >Delete</Button>
                                    </Cell>
                                </TableRow>
                            )
                        }
                    })
                }
                {/* {emptyRows > 0 && (
                    <TableRow style={{ height: 100 * emptyRows }}>
                          <Cell colSpan={8} />
                    </TableRow>
                )} */}
            </TableBody>
        )
    }

    RenderTable = () => {
        return (
            <div className ='table-wrapper'>
                <Table stickyHeader aria-label="sticky table" className = 'table'>
                    {this.TabHead()}
                    {this.TabBody()}
                </Table>
            </div>
        )
    }

    handleClickOpen = () => {
        this.setState({ open : true })
    }

    handleClose = () => {
        this.setState({ open : false })
    }

    alertOpen = (id) => {
        this.setState({ alert : true, deleteId : id })
    }

    alertClose = () => {
        this.setState({ alert : false })
    }

    // edit table handle
    Edit = (id) => {
        this.setState({ selectedID : id }, () => {
            console.info('selectedID : ', this.state.selectedID)
        })
    }

    Cancel = () => {
        this.setState({ selectedID : null }, () => {
            console.info('selectedID : ', this.state.selectedID)
        })
    }

    Delete = (id) => {
        console.log(id)
        Axios.delete(API_URL + `movies/${id}`)
        .then ( (res) => {
            Axios.get(API_URL + 'movies') // get the last data API and update out data state
            .then ( (res) => {
                this.setState ({ movies : res.data })
            })
            .catch ((err) => console.log(err))
        })
        .catch ((err) => console.log(err))
    }

    Submit = () => {
        let newTitle = this.newTitle.value
        let newGenre = this.newGenre.value
        let newDirector = this.newDirector.value
        let newCast = this.newCast.value
        let newPosterUrl = this.newPosterUrl.value
        let newTrailerUrl = this.newTrailerUrl.value.split('=')[1]
        let newSynopsis = this.newSynopsis.value
        if (newTitle === '') {
            alert('Make sure you fill all form including movie title')
        } else {
            Axios.post(API_URL + 'movies', {
                title : newTitle,
                genre: newGenre.split(','),
                poster : newPosterUrl,
                director : newDirector,
                casts : newCast.split(','),
                plot : newSynopsis,
                youtubeID : newTrailerUrl
            })
            .then( (res) => {
                Axios.get(API_URL + 'movies') // get the last data API and update out data state
                .then ( (res) => {
                    this.setState ({ movies : res.data })
                    // update our value to ''
                    this.newTitle.value = ''
                    this.newGenre.value = ''
                    this.newPosterUrl.value = ''
                    this.newTrailerUrl.value = ''
                    this.newSynopsis.value = ''
                    this.handleClose()
                })
                .catch ((err) => console.log(err))
            } )
            .catch ((err) => console.log(err))
        }
    }

    Done = (id) => {
        let {movies} = this.state
        console.log(movies)
        let editTitle = this.editTitle.value ? this.editTitle.value : movies[id-1].title
        let editDirector = this.editDirector.value ? this.editDirector.value : movies[id-1].director
        let editCasts = this.editCasts.value ? this.editCasts.value : movies[id-1].casts.join(',')
        let editGenre = this.editGenre.value ? this.editGenre.value : movies[id-1].genre.join(',')
        let editPosterUrl = this.editPosterUrl.value ? this.editPosterUrl.value : movies[id-1].poster
        let editSynopsis = this.editSynopsis.value ? this.editSynopsis.value : movies[id-1].plot
        Axios.patch(API_URL + `movies/${id}`, { // put will only add our provided data
            id : id,
            title : editTitle,
            genre : editGenre.split(','), // convert to an array 
            poster : editPosterUrl,
            director : editDirector,
            casts : editCasts.split(','),
            plot : editSynopsis
        })
        .then ( (res) => {
            Axios.get(API_URL + 'movies') // update our local data
            .then ( (res) => {
                this.setState({ movies : res.data, selectedID : null })
            })
            .catch ((err) => console.log(err))
        })
        .catch ((err) => console.log(err))

    }
    render () {
        let {page, rowsPerPage, movies} = this.state
        return (
            <div className = 'main-container'>
                <Button 
                variant="contained" 
                color="secondary" 
                onClick={this.handleClickOpen}
                startIcon={<AddIcon/>}
                id = 'btn-add-menu'
                >
                    Add Movie
                </Button>
                <Paper className = 'table-container' style = {{backgroundColor : theme.palette.primary.main}}>
                    {this.RenderTable()}
                    <Table>
                        <TableFooter>
                            <Row>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                    // colSpan={3}
                                    count={movies.length}
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
                    {/* ADD NEW MOVIE DIALOG */}
                    <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Add Movie</DialogTitle>
                        <DialogContent>
                        <DialogContentText>
                            Please fill all the movie details
                        </DialogContentText>
                            <TextField autoFocus margin="dense" label="Title" fullWidth inputRef = {newTitle => this.newTitle = newTitle}/>
                            <TextField autoFocus margin="dense" label="Genre" fullWidth inputRef = {newGenre => this.newGenre = newGenre}/>
                            <TextField autoFocus margin="dense" label="Director" fullWidth inputRef = {newDirector => this.newDirector = newDirector}/>
                            <TextField autoFocus margin="dense" label="Cast" fullWidth inputRef = {newCast => this.newCast = newCast}/>
                            <TextField autoFocus margin="dense" label="Poster Url" fullWidth inputRef = {newPosterUrl => this.newPosterUrl = newPosterUrl}/>
                            <TextField autoFocus margin="dense" label="Trailer Url" fullWidth inputRef = {newTrailerUrl => this.newTrailerUrl = newTrailerUrl}/>
                            <TextField autoFocus margin="dense" label="Synopsis" fullWidth inputRef = {newSynopsis => this.newSynopsis = newSynopsis}/>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={(event) => { this.Submit(); this.handleClose();}} color="primary">
                                Add
                            </Button>
                        </DialogActions>
                    </Dialog>
                    {/* DELETE ALERT DIALOG */}
                    <Dialog
                        open={this.state.alert}
                        onClose={this.alertClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Are you sure want to delete this movie ?"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Once you delete this movie, you will no longer get access all its data and
                                it will be disapear in data base.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick = {this.alertClose} color="primary">
                                No
                            </Button>
                            <Button onClick={(event) => { this.Delete(this.state.deleteId); this.alertClose();}} color="secondary" autoFocus>
                                Yes
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Paper>
            </div>
        )
    }
}

export default StoreManager