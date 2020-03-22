const mustMatchRoomName = room => userEnteredRoomName => {
    return room && userEnteredRoomName === room.name ? undefined : 'Room name not equal'
}

export { mustMatchRoomName }