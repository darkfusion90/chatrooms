import serverApi from '../server-api';

import { CONNECT_TO_SERVER } from '../constants/action_constants'

export default (url, onConnectionFailed) => async (dispatch) => {
    await serverApi.connectToServer(url, onConnectionFailed);
    dispatch({ type: CONNECT_TO_SERVER, payload: { connected: true } })
}
