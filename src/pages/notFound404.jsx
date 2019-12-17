import React from 'react'
import { Link } from 'react-router-dom'
import '../style/notFound.css'

class NotFound404 extends React.Component {
    render () {
        return (
            <div class="page_404">
                <div class="four_zero_four_bg">
                    <h1 class="text-center ">404</h1>
                </div>
                <div class="contant_box_404">
                    <h3 class="h2">Look like you're lost</h3>
                    <p>the page you are looking for not avaible!</p>
                    <Link to = '/'>
                        <div href="" class="link_404">Go to Home</div>
                    </Link>
                    <h6>CodePen : 404 page by Naved khan</h6>
                </div>
            </div>
        )
    }
}

export default NotFound404