const byName = (room, otherRoom) => {
    if (!room) {
        return otherRoom ? -1 : 1
    }

    if (!otherRoom) {
        return room ? 1 : -1
    }

    return room.name.localeCompare(otherRoom.name)
}

export { byName }