import { HIDE_TOAST } from "../../action-constants"

export default (name) => {
    return {
        type: HIDE_TOAST,
        payload: { name }
    }
}