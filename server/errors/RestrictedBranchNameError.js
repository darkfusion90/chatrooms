class RestrictedBranchNameError extends Error {
    constructor(branchName) {
        super(`Usage of Branch name ${branchName} is restricted`)
    }
}

module.exports = RestrictedBranchNameError