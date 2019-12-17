import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter } from 'react-router-dom'

// import main page
import Main from './main'

// react redux
import allReducers from './reducers'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

// import slick carousel
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

// import 'antd/dist/antd.css'

const store = createStore (allReducers, 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

// Display it to console 
store.subscribe( () => console.warn(store.getState()))

ReactDOM.render(
    <Provider store = {store}>
        <BrowserRouter>
            <Main />
        </BrowserRouter>
    </Provider>
    , document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
