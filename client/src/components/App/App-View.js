import React from 'react';
import { Helmet } from 'react-helmet'

import AppRouter from '../../routes/'

const App = (props) => {
    if (props.serverConnectionFailed) {
        return <div className='centered-content'>Cannot Connect To Server</div>;
    }

    return (
        <AppRouter>
            <Helmet>
                <title>{props.title}</title>
            </Helmet>
        </AppRouter>
    )
}


export default App;