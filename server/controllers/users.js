const User = require('../models/User')
const uniqueIdGenerator = require('../utils/uniqueIdGenerator')
const logger = require('../utils/logger')('[UsersController] ')

/**
 * Generates a random and unique userId
 *
 * @returns A random and unique userId
 */
function generateUserId() {
    return uniqueIdGenerator.generateIdUsingCrypto();
}

/**
 * Creates a user conditionally based on whether they are registered or not
 *
 * @returns A "User" document with different credentials according to the registration state
 */
function _createUser(username, password, isRegistered, expiresAt) {
    const userId = generateUserId();
    if (!isRegistered) {
        username = userId;
        return new User({ userId, username, isRegistered, expiresAt });
    }
    return new User({ userId, username, password, isRegistered });
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
    const user = _createUser(username, password, isRegistered, expiresAt)
    user.save((err) => {
        if (err) {
            logger.debug('UsersController: Error creating user: ', user)
            logger.debug(err);
            callback(err, user);
        }
        else {
            logger.debug('UsersController: Successfully created user: ', user);
            callback(null, user);
        }
    })
}


function createUnregisteredUser(expiresAt, callback) {
    createUser(null, null, false, expiresAt, callback);
}


function registerUser(userId, username, password, callback) {
    const toUpdate = {
        username: username,
        password: password,
        isRegistered: true,
        expiresAt: null
    }

    User.findOneAndUpdate(
        { userId: userId },
        toUpdate,
        {
            new: true,
            upsert: true,
            useFindAndModify: false
        },
        callback
    )
}


module.exports = { registerUser, createUnregisteredUser }