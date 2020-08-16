const config = require('../../config/config')
const isFunction = require('../../utils/isFunction')
const wrapCallback = require('../../utils/promiseCallbackFunction')
const RestrictedBranchNameError = require('../../errors/RestrictedBranchNameError')
const { createMessage, getAllMessagesFromBranch } = require('../messages')
const Branch = require('../../models/Branch')
const { POPULATE_CONFIG } = require('./utils')


const copyMessageToBranch = (message, destinationBranchId) => {
    const { author, atRoom, data } = message

    return createMessage(author._id, atRoom, destinationBranchId, data)
}

const copyAllMessagesToBranch = async (roomId, parentBranchId, destinationBranchId) => {
    const canCopyMessages = (messages) => messages && Array.isArray(messages);

    const parentMessages = await getAllMessagesFromBranch(roomId, parentBranchId)
    if (!canCopyMessages(parentMessages)) {
        return Promise.resolve(null)
    }

    for (i = 0; i < parentMessages.length; i++) {
        await copyMessageToBranch(parentMessages[i], destinationBranchId)
    }
}

const createNamedBranch = async (roomId, name, parentId, callback) => {
    const branch = new Branch({ room: roomId, name })
    console.log(`create named branch: ${branch}`);

    return wrapCallback((resolve, reject) => {
        console.log('Branch to be saved: ', branch);
        branch.save().then(doc => {
            console.log('Saved branch');
            doc.populate(POPULATE_CONFIG['room']).
                execPopulate().
                then(doc => {
                    if (doc && parentId) {
                        console.log('Has parentId. Will copy all messages');
                        copyAllMessagesToBranch(roomId, parentId, branch._id).
                            then(_ => resolve(doc)).catch(reject)
                    }

                    resolve(doc)
                }).catch(reject)
        }).catch(reject)
    }, callback)
}

const createMainBranch = (roomId, parentId, callback) => {
    return createNamedBranch(roomId, config.MAIN_BRANCH_NAME, parentId, callback)
}

const ensureNotMainBranchName = (name, callback) => {
    if (name == config.MAIN_BRANCH_NAME) {
        callback(new RestrictedBranchNameError(name))
        return true
    }
}

const createBranch = (roomId, ...args) => {
    const [name, parentId, callback] = args

    if (typeof name == 'string') {
        if (!ensureNotMainBranchName(name, callback)) {
            return createNamedBranch(roomId, name, parentId, callback)
        }
    } else if (isFunction(name)) {
        createMainBranch(roomId, parentId, callback)
    } else {
        throw Error(`Param name=${name} must be either a string or a callback fn`)
    }
}

module.exports = { createBranch, createMainBranch }