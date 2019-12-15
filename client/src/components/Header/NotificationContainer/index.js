import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

import NotificationIcon from './NotificationIcon/'
import NotificationListItem from './NotificationListItem/';

import './NotificationContainer.css'

class NotificationContainer extends React.Component {
    state = { showNotificationList: false }

    getDropdownMenuContent() {
        const { notifications } = this.props;

        if (notifications.length === 0) {
            return <div className="item">You don't have any notifications</div>
        }

        return (
            notifications.map(notification => {
                return (
                    <div>
                        <NotificationListItem notification={notification} />
                        <Dropdown.Divider />
                    </div>
                );
            })
        );
    }

    customMenu = React.forwardRef(({ children, style, className }, ref) => (
        <div ref={ref}
            style={style}
            className={`notification-list ui items ${className}`}

        >
            {children}
        </div>
    ))

    renderNotificationList() {
        return (
            <Dropdown.Menu as={this.customMenu} >
                <Dropdown.Header>Notifications</Dropdown.Header>
                {this.getDropdownMenuContent()}
            </Dropdown.Menu>
        );
    }

    onDropdownClick = () => {
        this.setState({
            showNotificationList: !this.state.showNotificationList
        })
    }

    render() {
        return (
            <Dropdown
                className="ui item icon button"
                drop="right"
                show={this.state.showNotificationList}
                onClick={this.onDropdownClick}
            >
                <NotificationIcon shouldShowBadge={this.props.notifications.length !== 0} />
                {this.renderNotificationList()}
            </Dropdown>
        )
    }
}

export default NotificationContainer;
