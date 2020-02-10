class Logger{
    constructor(loggerKey){
        this.loggerKey = loggerKey
    }

    debug(...args){
        console.log(this.loggerKey, ...args)
    }
}

module.exports = function (loggerKey){
    return new Logger(loggerKey)
}