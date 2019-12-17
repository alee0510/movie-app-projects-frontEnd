import React from 'react'
import Axios from 'axios'
import API_URL from '../supports'

class UserHistorTransaction extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            userTransaction : []
        }
    }

    componentDidMount () {
        let userID = localStorage.getItem('id')
        Axios.get(API_URL + `transactions/?userID${userID}`)
        .then((res) => this.setState({userTransaction : res.data}))
        .catch((err) => console.log(err))
    }
    render () {
        return (
            <div>
                Hello
            </div>
        )
    }
}

export default UserHistorTransaction