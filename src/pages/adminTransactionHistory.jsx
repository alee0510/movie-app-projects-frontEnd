import React from 'react'

class AdminHistoryTransaction extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            transactionsHistory : []
        }
    }

    componentDidMount () {
        Axios.get(API_URL + `transactions`)
        .then((res) => this.setState({transactionsHistory : res.data}))
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

export default AdminHistoryTransaction