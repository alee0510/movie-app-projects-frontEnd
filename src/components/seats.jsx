import React from 'react'


function Seat (props) {
    return (
        <div>Seat</div>
    )
}

function SeatRow (props) {
    return (
        <div>
            Seat Row
        </div>
    )
}

class SeatBoard extends React.Component {
    constructor (props) {
        super (props)
    }

    render () {
        return (
            <div>
                Render Seats
            </div>
        )
    }
}

export default SeatBoard