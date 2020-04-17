import _ from 'lodash'
import { SHOW_TOAST, HIDE_TOAST } from '../action-constants'
import initialStates from '../initial-states'


export default (state = initialStates.toast, action) => {
    switch (action.type) {
        case SHOW_TOAST:
            //Need only one instance of a particular toastName, hence, removing duplicates using _.uniq
            return { activeToasts: _.uniq([...state.activeToasts, action.payload.name]) }
        case HIDE_TOAST:
            let { name } = action.payload
            return { activeToasts: state.activeToasts.filter(toast => toast !== name) }
        default:
            return state
    }
}