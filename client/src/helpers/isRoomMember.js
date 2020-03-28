export default (room, queryUserId) => {
    if (!room || !room.members || !queryUserId) {
        return false
    }

    const memberDocIndex = room.members.findIndex(member => {
        return member.user && member.user._id === queryUserId
    })

    return memberDocIndex !== -1
}