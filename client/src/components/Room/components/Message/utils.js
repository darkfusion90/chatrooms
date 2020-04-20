import _ from 'lodash'

const PAD_CHAR = '0'
const PROPOSED_LENGTH = 2

const getFormattedTime = (date) => {
    const hour = _.padStart(date.getHours(), PROPOSED_LENGTH, PAD_CHAR)
    const mins = _.padStart(date.getMinutes(), PROPOSED_LENGTH, PAD_CHAR)

    return `${hour}:${mins}`
}

export { getFormattedTime }