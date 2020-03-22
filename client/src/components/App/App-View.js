import React from 'react';

import AppRouter from '../../routes/'

const App = (props) => {
    if (props.serverConnectionFailed) {
        return <div className='centered-content'>Cannot Connect To Server</div>;
    }

    return <AppRouter />
}


export default App;