class Exception {
        constructor(funcName, exceptionName, timestamps) {
                this.funcName = funcName;
                this.exceptionName = exceptionName;
                this.timestamps = timestamps;
        }
    }
    
    module.exports = Exception;