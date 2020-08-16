const RestrictedBranchNameError = require('../../errors/RestrictedBranchNameError')
const { defaultCallback } = require('../routeUtils')
const { createBranch } = require('../../controllers/branches')
const { MAIN_BRANCH_NAME } = require('../../config/config')
const {
    BAD_REQUEST,
    CONFLICT,
} = require('../../constants/httpStatusCodes')
const isEmpty = require('is-empty')
const ObjectId = require('mongoose').Types.ObjectId

const post = (req, res) => {
    const { roomId } = req.params
    const { branchName, parent } = req.body

    const { hasErrors, errors } = validateRequest(req)
    console.log({ errors });

    if (hasErrors) {
        return res.status(BAD_REQUEST).json(errors)
    }

    createBranch(roomId, branchName, parent, (err, branch) => {
        if (err && err instanceof RestrictedBranchNameError) {
            console.log('error caught');
            return res.status(CONFLICT).json({
                restrictedBranchName: `The branch name "${MAIN_BRANCH_NAME}" `
                    + 'is not allowed for non-default branches'
            })
        }

        defaultCallback(res)(err, branch)
    })
}

const validateRequest = (req) => {
    const { branchName, parent } = req.body
    const errors = {}

    if (!branchName) {
        errors.branchNameEmpty = 'The field "branchName" is required'
    }
    if (parent && !ObjectId.isValid(parent)) {
        errors.badTypeParent = 'The field "parent" needs to be an ObjectId'
    }

    return {
        hasErrors: !isEmpty(errors),
        errors,
    }
}

module.exports = post