function Console(parent) {
    this.debugMode = true;
    this.parent = parent;
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
    },
    writeError: function (message) {
        if (console) {
            console.error(message);
        }
    },
    writeGroup: function (name, messages) {
        if (console) {
            console.group(name);
            for (var message in messages) {
                console.log(messages[message]);
            }
            console.groupEnd()
        }
    },
    writeWarning: function (message) {
        if (console) {
            console.warn(message);
        }
    }
};