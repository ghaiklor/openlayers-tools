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

function OpenLayersTools() {
    this.Console = new Console();
    return this;
}

OpenLayersTools.prototype = {
    checkModule: function () {
        this.Console.writeInfo('OpenLayersTools exists!');
    }
};