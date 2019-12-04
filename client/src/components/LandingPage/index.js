import React from 'react';
import { connect } from 'react-redux';

import createRoom from '../../actions/createRoom';

import CreateRoomModal from '../modals/CreateRoomModal';
import JoinRoomModal from '../modals/JoinRoomModal';
import SuccessSnackbar from '../SuccessSnackbar';

import './LandingPage.css';


class LandingPage extends React.Component {
    state = {
        showSnackbar: false,
        showModal: false,
        modalName: null
    }

    roomHasChanged(prevProps) {
        if (prevProps.room === null) {
            return this.props.room !== null;
        }

        if (this.props.room === null) {
            return prevProps.room !== null;
        }

        return prevProps.room.room.id !== this.props.room.room.id;
    }

    componentDidUpdate(prevProps, prevState) {
        const currentRoom = this.props.room;
        if (currentRoom && currentRoom.status === 200 && this.roomHasChanged(prevProps)) {
            this.showSnackbar()
        }
    }

    activateModal = (modalName) => {
        this.setState({
            showModal: true,
            modalName: modalName
        })
    }

    renderModals() {
        if (this.state.showModal) {
            return (
                this.state.modalName === 'create' ?
                    <CreateRoomModal toggleModalVisibility={this.toggleModalVisibility} visible={true} /> :
                    <JoinRoomModal toggleModalVisibility={this.toggleModalVisibility} visible={true} />
            );
        }

        return null;
    }

    renderButtons() {
        return (
            <div className="ui large orange buttons">
                <button className="ui button" onClick={() => this.activateModal('create')}>
                    Create Room
                            </button>
                <div className="or"></div>
                <button className="ui button" onClick={() => this.showSnackbar()}>
                    Join Room
                </button>
            </div>
        );
    }

    toggleModalVisibility = () => {
        this.setState({
            showModal: !this.state.showModal
        })
    }

    showSnackbar() {
        this.setState({ showSnackbar: true })
    }

    onSnackbarCloseCallback = () => {
        this.setState({ showSnackbar: false })
    }

    render() {
        return (
            <div className="landing-page">
                <div className="inner-wrapper">
                    <p>Welcome to Chatrooms!</p>

                    <div className="buttons-container">
                        {this.renderButtons()}
                    </div>
                </div>
                {this.renderModals()}
                <SuccessSnackbar message="Room successfully created!" open={this.state.showSnackbar} onClose={this.onSnackbarCloseCallback} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { room: state.room };
}

export default connect(mapStateToProps, { createRoom })(LandingPage);