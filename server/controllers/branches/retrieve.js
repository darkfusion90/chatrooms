const Branch = require('../../models/Branch')
const { MAIN_BRANCH_NAME } = require('../../config/config')
const { executeQuery } = require('./utils')

const getMainBranch = (roomId, callback) => {
    const query = Branch.findOne({ room: roomId, name: MAIN_BRANCH_NAME })

    return executeQuery(query, callback)
}

const getBranch = (roomId, branchId, callback) => {
    const query = Branch.findOne({ _id: branchId, room: roomId })

    return executeQuery(query, callback)
}

const getAllBranchesOfRoom = (roomId, callback) => {
    const query = Branch.find({ room: roomId })

    return executeQuery(query, callback)
}

 
module.exports = { getBranch, getMainBranch, getAllBranchesOfRoom }
