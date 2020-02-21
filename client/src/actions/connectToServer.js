import {connectToServer} from '../server-communication/socketServer'

import { CONNECT_TO_SERVER } from '../constants/actionConstants'

export default (onConnectionFailed) => async (dispatch) => {
    /*
        TODO: This function will dispatch connected:true even if the connection may have failed.
            Although the onConnectionFailed callback takes care of it,
            the connection status should be either removed from redux store and use callback(s) only
            or remove callback(s) and read/update the connection status from/on the redux store
    */
    await connectToServer(onConnectionFailed);
    dispatch({ type: CONNECT_TO_SERVER, payload: { connected: true } })
}
