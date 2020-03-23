const byName = (room, otherRoom) => {
    if (!room || !room.name) {
        return otherRoom ? -1 : 1
    }

    if (!otherRoom || !otherRoom.name) {
        return room ? 1 : -1
    }

    return room.name.localeCompare(otherRoom.name)
}

const byDate = (room, otherRoom) => {
    if (!room || !room.createdAt) {
        return otherRoom ? -1 : 1
    }

    if (!otherRoom || !otherRoom.createdAt) {
        return room ? 1 : -1
    }

    return room.createdAt.localeCompare(otherRoom.createdAt)
}

export default { byName, byDate }