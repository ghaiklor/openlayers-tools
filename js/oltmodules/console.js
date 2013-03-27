/*
 Class: Console
 Implements methods to access the developer console.
 */
/*
 Constructor: Console
 Initialize the object of Console.

 Parameters:
 parent - Object that is the parent of this class.
 */
function Console(parent) {
    /*
     Variable: debugMode
     The flag, which sets management debug messages of OpenLayersTools.
     */
    this.debugMode = true;
    this.parent = parent;
    return this;
}

Console.prototype = {
    /*
     Function: writeInfo

     Write info message to console.

     Parameters:

     message - Message to be displayed.
     */
    writeInfo: function (message) {
        if (console) {
            console.info(message);
        }
    },
    /*
     Function: writeDebug

     Write debug message to console.

     Parameters:

     message - Message to be displayed.
     */
    writeDebug: function (message) {
        if (console && this.debugMode) {
            console.debug(message);
        }
    },
    /*
     Function: writeError

     Write error message to console.

     Parameters:

     message - Message to be displayed.
     */
    writeError: function (message) {
        if (console) {
            console.error(message);
        }
    },
    /*
     Function: writeGroup

     Write group of messages to console.

     Parameters:

     name - Group name.
     messages - Messages to be displayed.
     */
    writeGroup: function (name, messages) {
        if (console) {
            console.group(name);
            for (var message in messages) {
                console.log(messages[message]);
            }
            console.groupEnd()
        }
    },
    /*
     Function: writeWarning

     Write warning message to console.

     Parameters:

     message - Message to be displayed.
     */
    writeWarning: function (message) {
        if (console) {
            console.warn(message);
        }
    }
};