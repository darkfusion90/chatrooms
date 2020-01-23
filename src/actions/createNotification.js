import { CREATE_NOTIFICATION } from "../constants/actionConstants";

export default (title, content, actions) => {
    let action = {
        type: CREATE_NOTIFICATION,
        payload: { id: "id", title, content, actions }
    };
    console.log("action: ");
    console.log(action)
    return action;
}