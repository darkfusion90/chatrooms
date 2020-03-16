class Logger {
    constructor(loggerKey) {
        this.loggerKey = loggerKey
    }

    debug(...args) {
        console.log(this.loggerKey, ...args)
    }
}

export default (loggerKey) => {
    return new Logger(loggerKey)
}