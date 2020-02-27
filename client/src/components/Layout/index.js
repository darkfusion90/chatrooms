import React from 'react';
import Header from '../Header';

const Layout = (props) => {
    return (
        <div className="app">
            <Header />
            <div style={{ paddingTop: '60px' }}>
                {props.children}
            </div>
        </div>
    )
}

export default Layout;
