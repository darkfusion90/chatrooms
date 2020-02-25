import React from 'react';
import { connect } from 'react-redux';
import NavItem from 'react-bootstrap/NavItem';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import Dropdown from '../../components/Dropdown';
import logoutUser from '../../actions/logoutUser';
import './UserDropdownInfo.scss';

class UserDropdownInfo extends React.Component {

    onLogoutButtonClick = () => {
        this.props.logoutUser();
    }

    renderTriggerComponent = () => {
        return (
            <NavItem as={"span"} className="header-icon" >
                <FontAwesomeIcon icon={faUser} size="lg" />
            </NavItem>
        )
    }

    renderTitle = () => {
        return (
            <span style={{ fontWeight: "normal" }}>
                Signed in as <strong>{this.props.username}</strong>
            </span>
        )
    }

    renderMenu = () => {
        return (
            <div className="user-info-dropdown-menu-container">
                <Button variant="outline-secondary" onClick={this.onLogoutButtonClick}>Log Out</Button>
            </div>
        )
    }

    render() {
        return (
            <Dropdown
                title={this.renderTitle()}
                menu={this.renderMenu()}
                triggerComponent={this.renderTriggerComponent()}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return { username: state.user.user.username }
}

export default connect(mapStateToProps, { logoutUser })(UserDropdownInfo);