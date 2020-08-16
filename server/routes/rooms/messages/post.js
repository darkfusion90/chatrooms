const {
    createMessage,
    createMainBranchMessage
} = require('../../../controllers/messages')
const { genericHandlerCallback } = require('../../routeUtils')


const post = (req, res) => {
    const callback = (err, data) => genericHandlerCallback(err, data, res)

    const { roomId, branchId } = req.params
    const { userId } = req.session
    const { message } = req.body
    if (!message) {
        return res.status(httpStatusCodes.BAD_REQUEST).json({
            'message': 'Field message is necessary'
        })
    }

    /*  TODO: Create a class that will be required to be implemented by all handlers with
        these optional params. In the class, call the appropriate handler
        Example:
            class OptionalParamHandler{  
                handle(req, res){
                    if(req.param.optional)
                        this.withOptional()
                    else
                        this.withoutOptional()
                        
                }    
            }
    */

    if (branchId) {
        createMessage(userId, roomId, branchId, message, callback)
    } else {
        createMainBranchMessage(userId, roomId, message, callback)
    }
}

module.exports = post