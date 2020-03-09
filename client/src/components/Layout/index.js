import React from 'react';
import Header from '../Header';

const Layout = (props) => {
    return (
        <div className="app">
            <Header />
            <div>
                {props.children}
            </div>
        </div>
    )
}

export default Layout;
