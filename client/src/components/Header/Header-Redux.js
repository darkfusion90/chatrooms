import React from 'react';
import { connect } from 'react-redux';

import HeaderView from './Header-View'

const HeaderRedux = ({ isUserRegistered, isUserLoggedIn }) => {
    return (
        <HeaderView
            isUserRegistered={isUserRegistered}
            isUserLoggedIn={isUserLoggedIn}
        />
    );
}

const mapStateToProps = (state) => {
    const { user } = state
    return {
        isUserLoggedIn: user.isLoggedIn,
        isUserRegistered: user.user && user.user.isRegistered
    }
}

export default connect(mapStateToProps)(HeaderRedux);

/*
Logo credits

<div>
    Icons made by
    <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">
        Smashicons
    </a>
    from
    <a href="https://www.flaticon.com/" title="Flaticon">
        www.flaticon.com
    </a>
</div>
*/