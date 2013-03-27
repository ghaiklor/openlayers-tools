/*
 Class: OpenLayersTools.BaseFunc
 This class implements the basic functions such as centering the map, converting the geometry and more.
 */
/*
 Constructor: BaseFunc
 Initialize the object BaseFunc.

 Parameters:
 parent - Object that is the parent of this class.

 Returns:
 Object of BaseFunc.
 */
function BaseFunc(parent) {
    this.parent = parent;
    return this;
}

BaseFunc.prototype = {
    /*
     Function: extendConfigFromDefault

     Expands the list of object parameters.

     Parameters:

     existsConfig - The object to add parameters (expand).
     defaultConfig - Object from which to take the value to extend.

     Returns:

     The object, which includes a fields of two objects.
     */
    extendConfigFromDefault: function (existsConfig, defaultConfig) {
        if (existsConfig == null || existsConfig == undefined) {
            return defaultConfig;
        }
        for (var param in defaultConfig) {
            if (existsConfig[param] == undefined || existsConfig[param] == null) {
                existsConfig[param] = defaultConfig[param];
            }
        }
        return existsConfig;
    },
    /*
     Function: centerMap

     Centers the map on the specified coordinates.

     Parameters:

     lon - longitude.
     lat - latitude.
     projection - projection.

     Returns:

     True if the function is successful.
     */
    centerMap: function (lon, lat, projection) {
        var point = new OpenLayers.LonLat(lon, lat);
        point.transform(new OpenLayers.Projection(projection), this.parent.Map.getProjectionObject());
        this.parent.Map.moveTo(point);
        return true;
    },
    /*
     Function: bindEventToObject

     Wire up the event to the object.

     Parameters:

     object - Object on which to hang the event.
     listeners - An object that specifies the types of events and functions for data processing.

     Returns:

     True if the function is successful.
     */
    bindEventToObject: function (object, listeners) {
        if (object.events == undefined) {
            this.parent.Console.writeError('Func: bindEventToObject | Object don\'t have events callbacks!');
            return false;
        }
        object.events.on(listeners);
        return true;
    },
    /*
     Function: checkUndefined

     Checks the variable to exist.

     Parameters:

     object - Variable you want to check.

     Returns:

     True if the object does not exist, and false if the object exists.
     */
    checkUndefined: function (object) {
        return object == undefined || object == null || object == '';
    },
    /*
     Function: geometryToString

     Converts the geometry into a string.

     Parameters:

     geometry - Geometry, which is the class of OpenLayers.Geometry.

     Returns:

     WKT of given geometry.
     */
    geometryToString: function (geometry) {
        return geometry.toString();
    },
    /*
     Function: stringToGeometry

     Converts a string to geometry.

     Parameters:

     string - WKT of geometry that you want to convert.

     Returns:

     OpenLayers.Geometry of given WKT.
     */
    stringToGeometry: function (string) {
        return OpenLayers.Geometry.fromWKT(string);
    }
};