import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import RouteRoot from './root'
import RouteLogin from './login'
import RouteRegister from './register'
import RouteRooms from './rooms'
import RouteJoinRequests from './join-requests'


const AppRouter = (props) => {
    return (
        <BrowserRouter>
            {props.children}
            <Switch>
                <Route exact path="/" component={RouteRoot} />
                <Route exact path="/login" component={RouteLogin} />
                <Route exact path="/register" component={RouteRegister} />
                <Route exact path="/rooms/join-requests" component={RouteJoinRequests} />
                <Route exact path="/rooms/:id?" component={RouteRooms} />
            </Switch>
        </BrowserRouter>
    )
}

export default AppRouter