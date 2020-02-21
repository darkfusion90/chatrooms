import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Layout from '../Layout';
import LandingPage from '../LandingPage';
import ServerConnectionFailed from '../errors/ServerConnectionFailed';
import PageNotFound from '../errors/PageNotFound';
import LoginContainer from '../../containers/LoginContainer';
import RegisterContainer from '../../containers/RegisterContainer';
import RoomListContainer from '../../containers/RoomListContainer';
import RoomContainer from '../../containers/RoomContainer';

import './App.scss';


const App = (props) => {

    const renderBody = () => {
        if (props.serverConnectionFailed) {
            return <ServerConnectionFailed />;
        }
        return (
            <Switch>
                <Route exact path="/" component={LandingPage} />
                <Route exact path="/rooms/:id" component={RoomContainer} />
                <Route exact path="/rooms" component={RoomListContainer} />
                <Route exact path="/login" component={LoginContainer} />
                <Route exact path="/register" component={RegisterContainer} />
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