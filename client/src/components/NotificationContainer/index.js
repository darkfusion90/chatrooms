import React from 'react';
import { connect } from 'react-redux';

import NotificationIcon from './NotificationIcon';
import NotificationListItem from './NotificationListItem';
import Dropdown from '../Dropdown';

import './NotificationContainer.scss'

class NotificationContainer extends React.Component {
    getDropdownMenu() {
        const { notifications } = this.props;
        if (notifications.length === 0) {
            return <div className="item">You don't have any notifications</div>
        }

        return (
            Object.keys(notifications.data).map(id => {
                return (
                    <div key={id}>
                        <NotificationListItem
                            notification={notifications.data[id]}
                        />
                        <hr />
                    </div>
                );
            })
        );
    }

    getWrappedNotificationIcon() {
        return (
            <span className="header-icon nav-item">
                <NotificationIcon shouldShowBadge={this.props.notifications.length !== 0} />
            </span>
        );
    }

    render() {
        return (
            <Dropdown
                title="Notifications"
                menu={this.getDropdownMenu()}
                triggerComponent={this.getWrappedNotificationIcon()}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return { notifications: state.notifications }
}

export default connect(mapStateToProps, null)(NotificationContainer);

