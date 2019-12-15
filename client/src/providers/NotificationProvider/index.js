import React from 'react';

class NotificationProvider extends React.PureComponent {
    state = { notifications: [1,2,3] }

    createNotification = (title, content, actions) => {
        this.setState({
            notifications: [...this.state.notifications,
            { title, content, actions }]
        })
    }

    clearAllNotifications = () => {
        this.setState({ notifications: [] })
    }

    getPropsForChildren() {
        return {
            notifications: this.state.notifications,
            createNotification: this.createNotification,
            clearAllNotifications: this.clearAllNotifications
        };
    }

    render() {
        const childrenWithProps = React.Children.map(this.props.children, child => {
            return React.cloneElement(child, this.getPropsForChildren());
        })

        return (
            <div>
                {childrenWithProps}
            </div>
        );
    }
}

export default NotificationProvider;
