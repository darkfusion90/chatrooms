import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Layout from '../Layout';
import LandingPage from '../LandingPage';
import ServerConnectionFailed from '../errors/ServerConnectionFailed';
import PageNotFound from '../errors/PageNotFound';
import LoginContainer from '../../containers/LoginContainer';
import RegisterContainer from '../../containers/RegisterContainer';
import RoomAndRoomListWrapperContainer from '../../containers/RoomAndRoomListWrapperContainer';

import Room from '../../components-beta/Room'
import RoomList from '../../components-beta/RoomList'
import Register from '../../components-beta/Register'

import './App.scss';


const App = (props) => {

    const renderBody = () => {
        if (props.serverConnectionFailed) {
            return <ServerConnectionFailed />;
        }
        return (
            <Switch>
                <Route exact path="/" component={LandingPage} />
                <Route exact path="/rooms/:id?" component={RoomAndRoomListWrapperContainer} />
                <Route exact path="/login" component={LoginContainer} />
                <Route exact path="/register" component={RegisterContainer} />
                <Route exact path="/test/register" component={Register} />
                <Route exact path="/test/rooms/:roomId" component={Room} />
                <Route exact path="/test/rooms" component={RoomList} />
                <Route exact path="*" component={PageNotFound} />
            </Switch>
        );
    }

    return (
        <BrowserRouter>
            <Layout>
                {renderBody()}
            </Layout>
        </BrowserRouter>
    );
}


export default App;