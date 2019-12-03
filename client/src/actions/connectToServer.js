import serverApi from '../server-api';

import { NEW_SERVER_CONNECTION } from './types';

export default (url) => async (dispatch) => {
    await serverApi.connectToServer(url);
    dispatch({ type: NEW_SERVER_CONNECTION, payload: serverApi.webSocket })
}
