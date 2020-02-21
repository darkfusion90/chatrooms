import React from 'react';
import { Spinner } from 'react-bootstrap'

import Room from '../../components/Room';
import Forbidden from '../../components/errors/Forbidden'
import PageNotFound from '../../components/errors/PageNotFound'
import { getRoom } from '../../server-communication/httpServer'

class RoomContainer extends React.Component {
    state = {
        room: null,
        error: null
    }

    componentDidMount() {
        const roomId = this.props.match.params.id;
        getRoom(roomId, this.onRoomFetchSuccess, this.onRoomFetchFail)
    }

    onRoomFetchSuccess = (response) => {
        this.setState({ room: response.data, error: null })
    }

    onRoomFetchFail = ({ response }) => {
        console.log('Room fetch failed: ', response)
        this.setState({ error: response })
    }

    renderError() {
        const { status } = this.state.error;
        if (status === 403) {
            return <Forbidden msg='User not allowed'/>
        }
        else if (status === 404) {
            return <PageNotFound />
        }

        return <div>Unexpected Error</div>
    }

    render() {
        const { room, error } = this.state;
        if (room) {
            return <Room room={room} />;
        }

        if(error){
            return this.renderError()
        }

        return (
            <div className='centered-content'>
                <h2>Please wait while your Room is loading...</h2>
                <Spinner animation='border' size='xl' />
            </div >
        );
    }
}

export default RoomContainer;
