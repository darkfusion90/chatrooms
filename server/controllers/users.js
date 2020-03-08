const { User } = require('../models/User')
const { getUpdatableFieldsFromData } = require('./util')
const uniqueIdGenerator = require('../utils/uniqueIdGenerator')
const logger = require('../utils/logger')('[UsersController] ')

const PROJECTIONS = {
    '_id': 1,
    'username': 1,
    'isRegistered': 1,
}

function filterUsingProjections(user) {
    if (!user) {
        return user
    }

    const filteredUser = {}
    Object.keys(PROJECTIONS).forEach(field => {
        if (PROJECTIONS[field] === 1) {
            filteredUser[field] = user[field]
        }
    })
    return filteredUser
}

/**
 * Generates a random and unique username
 *
 * @returns A random and unique username
 */
function generateRandomUsername() {
    return uniqueIdGenerator.generateIdUsingCrypto();
}

/**
 * Creates a user in the database with the given credentials
 * @param {string} username The username assigned to the user
 *                          (Will be set to userId if user is a temporary, session based user)
 *
 * @param {string} password The user's login password
 *                          (Is null if user is a temporary, session based user)
 *
 * @param {boolean} isRegistered Indicates if a user is registered (i.e., has login credentials)
 *                               or not (i.e., uses sessions to access the app)
 *
 * @param {Date} expiresAt Indicates when should the user be removed from the database
 *                              (only applicable for unregistered users).
 *                              This is generally equal to the user's session expiry date
 *
 * @param {Function} callback Callback to report status of user creation
 */
function createUser(username, password, isRegistered, expiresAt, callback) {
    username = username ? username : generateRandomUsername()

    const user = new User({ username, password, expiresAt, isRegistered })
    user.save((err) => {
        if (err) {
            logger.debug('UsersController: Error creating user: ', user)
            logger.debug(err);
            callback(err, filterUsingProjections(user));
        }
        else {
            logger.debug('UsersController: Successfully created user: ', user);
            callback(null, filterUsingProjections(user));
        }
    })
}

function createUnregisteredUser(expiresAt, callback) {
    createUser(null, null, false, expiresAt, callback);
}

function createRegisteredUser(data, callback) {
    createUser(data.username, data.password, true, null, callback);
}

function registerUser(userId, username, password, callback) {
    const toUpdate = {
        username: username,
        password: password,
        isRegistered: true,
        expiresAt: null
    }

    const options = {
        fields: PROJECTIONS,
        new: true,
        upsert: true,
    }

    User.findByIdAndUpdate(userId, toUpdate, options, callback)
}

function _getUser(id, callback, options = PROJECTIONS) {
    const promise = new Promise((resolve, reject) => {
        User.findById(id, options).then(user => {
            logger.debug('User found. Promise resolve: ', user)
            resolve(user)
        }).catch(err => {
            logger.debug('Error encountered. Promise reject: ', err)
            reject(err)
        })
    })

    if (callback && typeof (callback) === 'function') {
        promise.then(user => callback(null, user)).catch(err => callback(err, null))
    }

    return promise
}

function getUser(id, callback) {
    return _getUser(id, callback)
}

function getUserWithExpiresAtField(userId, callback) {
    return _getUser(userId, callback, { ...PROJECTIONS, expiresAt: 1 })
}

function getUserByUsername(username, isFromPassportAuth, callback) {
    //Include password in projection if and only if coming from Passport Auth
    let projections = PROJECTIONS;
    if (isFromPassportAuth) {
        projections = { ...PROJECTIONS, 'password': 1 }
    }

    User.findOne({ username: username }, projections, callback)
}

function updateUser(userId, data, callback) {
    const updatableFields = ['username', 'password']
    const toUpdate = getUpdatableFieldsFromData(data, updatableFields)
    const options = { fields: PROJECTIONS, new: true }

    User.findByIdAndUpdate(userId, toUpdate, options, callback)
}

function deleteUser(userId, callback) {
    const options = { fields: PROJECTIONS }
    User.findOneAndDelete({ userId: userId }, options, (err, user) => callback(err, filterUsingProjections(user)))
}

function updateUserDocumentExpirationDate(userId, newExpiresAt, callback) {
    User.findByIdAndUpdate(userId, { expiresAt: newExpiresAt }, { rawResult: false }, callback)
}

module.exports = {
    registerUser,
    createRegisteredUser,
    createUnregisteredUser,
    getUser,
    getUserByUsername,
    getUserWithExpiresAtField,
    updateUser,
    deleteUser,
    filterUsingProjections,
    updateUserDocumentExpirationDate
}