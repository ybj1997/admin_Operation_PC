import React, { Component } from 'react'
import { BrowserRouter, Route, Switch ,Redirect} from 'react-router-dom'
import Admin from './pages/admin'
import Login from './pages/login'

export default class App extends Component {

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path='/admin' component={Admin}></Route>
                    <Route path='/login' component={Login}></Route>
                    <Redirect to='/login'></Redirect>
                </Switch>
            </BrowserRouter>
        )
    }
}
