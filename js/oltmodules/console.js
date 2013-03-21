function Console() {
    this.debugMode = true;
    return this;
}

Console.prototype = {
    writeInfo: function (message) {
        if (console) {
            console.info(message);
        }
    },
    writeDebug: function (message) {
        if (console && this.debugMode) {
            console.debug(message);
        }
    }
};