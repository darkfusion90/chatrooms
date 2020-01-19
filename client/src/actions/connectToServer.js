import serverApi from '../server-api';

import { CONNECT_TO_SERVER } from '../constants/actionConstants'

export default (onConnectionFailed) => async (dispatch) => {
    await serverApi.connectToServer(onConnectionFailed);
    dispatch({ type: CONNECT_TO_SERVER, payload: { connected: true } })
}
