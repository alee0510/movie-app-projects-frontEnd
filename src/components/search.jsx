import React from 'react'
import { InputBase } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
// import Icon from '@material-ui/core/Icon';
import '../style/search.css'


class Search extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            show : false
        }
    }
    
    toggle = () => {
        this.setState ({show : !this.state.show}, () => {
            console.log(this.state.show)
        })
    }

    render () {
        const search = {
            width : this.state.show ? '250px' : '39px'
        }

        return (
            <div className = 'search' >
                <div id = 'searchIcon' >
                    <SearchIcon color="secondary" onClick = {this.toggle}/>
                </div>
                <InputBase id = 'input' placeholder="Search..." style = {search}/>
            </div>
        )
    }
}

export default Search