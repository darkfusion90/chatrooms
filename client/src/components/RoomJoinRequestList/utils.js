const PRIORITY_HIGH = 'high'
const PRIORITY_MEDIUM = 'medium'
const PRIORITY_LOW = 'low'


const sortWithPriority = (a, b, priority) => {
    if (a === b) {
        return 0
    } else if (priority[a] === PRIORITY_HIGH) {
        return -1
    } else if (priority[b] === PRIORITY_HIGH) {
        return 1
    } else {
        return priority[a] === PRIORITY_LOW ? 1 : -1
    }
}

const sortRequestList = (a, b) => {
    const priority = {
        'initial': PRIORITY_HIGH,
        'accepted': PRIORITY_MEDIUM,
        'failure': PRIORITY_LOW
    }
    return sortWithPriority(a.status, b.status, priority)
}

const countRequestsInitial = (list) => {
    return list.filter(item => item.status === 'initial').length
}

const countRequestsAccepted = (list) => {
    return list.filter(item => item.status === 'accepted').length
}

const countRequestsRejected = (list) => {
    return list.filter(item => item.status === 'rejected').length
}

export {
    sortRequestList,
    countRequestsInitial,
    countRequestsAccepted,
    countRequestsRejected
}