class Exception {
        constructor(funcName, exceptionName, timestamp) {
                this.funcName = funcName;
                this.exceptionName = exceptionName;
                this.timestamp = timestamp;
        }
    }
    
    module.exports = Exception;