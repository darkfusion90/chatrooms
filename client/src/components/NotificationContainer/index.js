import React from 'react';
import { connect } from 'react-redux';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import NotificationIcon from './NotificationIcon';
import NotificationListItem from './NotificationListItem';

import './NotificationContainer.scss'

class NotificationContainer extends React.Component {
    getDropdownMenuContent() {
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

    getNotificationListPopover = () => {
        return (
            <Popover>
                <Popover.Title as="h2">Notifications</Popover.Title>
                <Popover.Content>
                    {this.getDropdownMenuContent()}
                </Popover.Content>
            </Popover>
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
            <OverlayTrigger
                trigger="click"
                placement="bottom"
                rootClose={true}
                overlay={this.getNotificationListPopover()}
            >
                {this.getWrappedNotificationIcon()}
            </OverlayTrigger>
        )
    }
}

const mapStateToProps = (state) => {
    return { notifications: state.notifications }
}

export default connect(mapStateToProps, null)(NotificationContainer);
