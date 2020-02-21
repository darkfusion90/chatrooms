export default (values) => {
    const errors = {}
    if (!values.roomName) {
        errors.roomName = 'Room name cannot be empty'
    }

    if (!values.roomType) {
        errors.roomType = 'Please choose one of the room types above'
    }

    return errors
}