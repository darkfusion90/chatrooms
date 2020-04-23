import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import RouteRoot from './root'
import RouteLogin from './login'
import RouteRegister from './register'
import RouteRooms from './rooms'

const AppRouter = (props) => {
    return (
        <BrowserRouter>
            {props.children}
            <Switch>
                <Route exact path="/" component={RouteRoot} />
                <Route exact path="/rooms/:id?" component={RouteRooms} />
                <Route exact path="/login" component={RouteLogin} />
                <Route exact path="/register" component={RouteRegister} />
            </Switch>
        </BrowserRouter>
    )
}

export default AppRouter