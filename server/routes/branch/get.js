const {
    defaultCallback,
    handleArrayResponse
} = require('../routeUtils')
const {
    getMainBranch,
    getBranch,
    getAllBranchesOfRoom
} = require('../../controllers/branches')


const get = (req, res) => {
    const { roomId, branchId } = req.params

    if (branchId) {
        getBranch(roomId, branchId, defaultCallback(res))
    } else {
        getAllBranchesOfRoom(roomId, handleArrayResponse(res, 'branches'))
    }
}

const getMain = (req, res) => {
    const { roomId } = req.params

    getMainBranch(roomId, defaultCallback(res))
}


module.exports = { get, getMain }