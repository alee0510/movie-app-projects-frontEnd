import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect, useSelector } from 'react-redux'


export const PrivateRoute = ({ component: Component, ...rest }) => {
    const username = useSelector(state => state.login.username)
    const role = useSelector(state => state.login.role)

    if (username) {
        return (
            <Route {...rest} render = {(props) => {
                if (role === 'admin') {
                    return <Component {...props}/>
                }                    
                return <Redirect to = '/NotFound404'/>
            }}/>
        )
    }
    return <Redirect to = '/NotFound404'/>
}