/*! OpenLayersTools - v0.1.0 - 2013-03-28
* http://ghaiklor.github.com/openlayers-tools/demo/
* Copyright (c) 2013 Obrezkov Evgen aka ghaiklor; Licensed MIT */
/*
 Constructor: OpenLayersTools
 Initializes the class and includes all the necessary modules and classes in an object.

 Parameters:
 mapOptions - Initialization parameters map. This parameter is passed to the constructor of OpenLayers.Map.

 Returns:
 The object, which encompasses all the objects required for the engine.
 */
function OpenLayersTools(mapOptions) {
    /*
     Variable: BaseFunc
     Object of BaseFunc.
     */
    this.BaseFunc = new BaseFunc(this);
    /*
     Variable: Console
     Object of Console.
     */
    this.Console = new Console(this);
    /*
     Variable: Control
     Object of Control
     */
    this.Control = new Control(this);

    /*
     Variable: Layer
     Object of Layer.
     */
    this.Layer = new Layer(this);
    /*
     Variable: Track
     Object of Track.
     */
    this.Track = new Track(this);
    /*
     Variable: Vehicle
     Object of Vehicle.
     */
    this.Vehicle = new Vehicle(this);
    /*
     Variable: MapOptions
     An object that contains the settings for OpenLayers.Map
     */
    this.MapOptions = this.BaseFunc.extendConfigFromDefault(mapOptions, defaultOptions.mapOptions);
    /*
     Variable: Map
     This object stores the created object OpenLayers.Map()
     */
    this.Map = new OpenLayers.Map(this.MapOptions);

    OpenLayers.ImgPath = this.MapOptions.imgPath;

    this.BaseFunc.centerMap(32.25366, 48.51982, this.MapOptions.displayProjection);

    return this;
}

OpenLayersTools.prototype = {
    /*
     Function: checkModule
     Check the created object to the presence of all required modules.

     Returns:
     Writes in the console all the created objects.
     */
    checkModule: function () {
        var messages = [];
        for (var obj in this) {
            messages.push(obj + ' exists!');
        }
        messages.push('OpenLayersTools Prototype exists! All is fine! :)');
        this.Console.writeGroup('Checking modules of OpenLayersTools', messages);
    }
};
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

     Usage:
     (start code)
     MapOptions = OpenLayersTools.BaseFunc.extendConfigFromDefault(mapOptions, defaultOptions.mapOptions);
     (end code)
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

     Usage:
     (start code)
     OpenLayersTools.BaseFunc.centerMap(longitude, latitude, 'EPSG:4326');
     (end code)
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

     Usage:
     (start code)
     Coming soon...
     (end code)
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

     Usage:
     (start code)
     if (OpenLayersTools.BaseFunc.checkUndefined(layer)) {
     OpenLayersTools.Console.writeError('layer is undefined!');
     return false;
     }
     (end code)
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

     Usage:
     (start code)
     Coming soon...
     (end code)
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

     Usage:
     (start code)
     Coming soon...
     (end code)
     */
    stringToGeometry: function (string) {
        return OpenLayers.Geometry.fromWKT(string);
    }
};
/*
 Constructor: Console
 Initialize the object of Console.

 Parameters:
 parent - Object that is the parent of this class.

 Returns:
 Object of Console.
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
/*
 Constructor: Control
 Create an object of Control.

 Parameters:
 parent - Object that is the parent of this class.

 Returns:
 Object of Control.
 */
function Control(parent) {
    this.parent = parent;
    /*
     Variable: controls
     In this array are stored by all controls of OpenLayers.
     */
    this.controls = [];
    return this;
}

Control.prototype = {
    addControlToMapAndSaveForReturn: function (index, control) {
        this.parent.Map.addControl(control);
        this.controls[index] = control;
    },
    /*
     Function: addControls
     Function creates and adds controls to the OpenLayers.

     Parameters:
     controls - An object with a list of the necessary controls and their parameters.

     Returns:
     Fill this.controls array with object controls.

     Usage:
     (start code)
     OpenLayersTools.Control.addControls({
     LayerSwitcher: {
     controlType: 'LayerSwitcher',
     roundedCorner: true
     },
     MousePosition: {
     controlType: 'MousePosition'
     }
     (end code)
     */
    addControls: function (controls) {
        for (var control in controls) {
            if (controls[control].controlType == undefined) {
                this.parent.Console.writeError('Func: addControls | You must specify controlType attribute in control parameters!');
                return false;
            }
            switch (controls[control].controlType) {
                case 'ArgParser':
                    this.addControlToMapAndSaveForReturn(control, new OpenLayers.Control.ArgParser(controls[control]));
                    break;
                case 'Attribution':
                    this.addControlToMapAndSaveForReturn(control, new OpenLayers.Control.Attribution(controls[control]));
                    break;
                case 'Button':
                    this.addControlToMapAndSaveForReturn(control, new OpenLayers.Control.Button(controls[control]));
                    break;
                case 'CacheRead':
                    this.addControlToMapAndSaveForReturn(control, new OpenLayers.Control.CacheRead(controls[control]));
                    break;
                case 'CacheWrite':
                    this.addControlToMapAndSaveForReturn(control, new OpenLayers.Control.CacheWrite(controls[control]));
                    break;
                case 'DragFeature':
                    this.addControlToMapAndSaveForReturn(control, new OpenLayers.Control.DragFeature(this.parent.Layer.getLayerByName(controls[control].layerName), controls[control]));
                    break;
                case 'DragPan':
                    this.addControlToMapAndSaveForReturn(control, new OpenLayers.Control.DragPan(controls[control]));
                    break;
                case 'DrawFeature':
                    this.addControlToMapAndSaveForReturn(control, new OpenLayers.Control.DrawFeature(this.parent.Layer.getLayerByName(controls[control].layerName), controls[control].OpenLayersHandler, controls[control]));
                    break;
                case 'EditingToolbar':
                    this.addControlToMapAndSaveForReturn(control, new OpenLayers.Control.EditingToolbar(this.parent.Layer.getLayerByName(controls[control].layerName), controls[control]));
                    break;
                case 'Geolocate':
                    this.addControlToMapAndSaveForReturn(control, new OpenLayers.Control.Geolocate(controls[control]));
                    break;
                case 'GetFeature':
                    this.addControlToMapAndSaveForReturn(control, new OpenLayers.Control.GetFeature(controls[control]));
                    break;
                case 'Graticule':
                    this.addControlToMapAndSaveForReturn(control, new OpenLayers.Control.Graticule(controls[control]));
                    break;
                case 'KeyboardDefaults':
                    this.addControlToMapAndSaveForReturn(control, new OpenLayers.Control.KeyboardDefaults(controls[control]));
                    break;
                case 'LayerSwitcher':
                    this.addControlToMapAndSaveForReturn(control, new OpenLayers.Control.LayerSwitcher(controls[control]));
                    break;
                case 'Measure':
                    this.addControlToMapAndSaveForReturn(control, new OpenLayers.Control.Measure(controls[control].OpenLayersHandler, controls[control]));
                    break;
                case 'ModifyFeature':
                    this.addControlToMapAndSaveForReturn(control, new OpenLayers.Control.ModifyFeature(this.parent.Layer.getLayerByName(controls[control].layerName), controls[control]));
                    break;
                case 'MousePosition':
                    this.addControlToMapAndSaveForReturn(control, new OpenLayers.Control.MousePosition(controls[control]));
                    break;
                case 'Navigation':
                    this.addControlToMapAndSaveForReturn(control, new OpenLayers.Control.Navigation(controls[control]));
                    break;
                case 'NavigationHistory':
                    this.addControlToMapAndSaveForReturn(control, new OpenLayers.Control.NavigationHistory(controls[control]));
                    break;
                case 'NavToolbar':
                    this.addControlToMapAndSaveForReturn(control, new OpenLayers.Control.NavToolbar(controls[control]));
                    break;
                case 'OverviewMap':
                    this.addControlToMapAndSaveForReturn(control, new OpenLayers.Control.OverviewMap(controls[control]));
                    break;
                case 'Pan':
                    this.addControlToMapAndSaveForReturn(control, new OpenLayers.Control.Pan(controls[control].direction, controls[control]));
                    break;
                case 'Panel':
                    this.addControlToMapAndSaveForReturn(control, new OpenLayers.Control.Panel(controls[control]));
                    break;
                case 'PanPanel':
                    this.addControlToMapAndSaveForReturn(control, new OpenLayers.Control.PanPanel(controls[control]));
                    break;
                case 'PanZoom':
                    this.addControlToMapAndSaveForReturn(control, new OpenLayers.Control.PanZoom(controls[control]));
                    break;
                case 'PanZoomBar':
                    this.addControlToMapAndSaveForReturn(control, new OpenLayers.Control.PanZoomBar(controls[control]));
                    break;
                case 'Permalink':
                    this.addControlToMapAndSaveForReturn(control, new OpenLayers.Control.Permalink(controls[control].element, controls[control].base, controls[control]));
                    break;
                case 'PinchZoom':
                    this.addControlToMapAndSaveForReturn(control, new OpenLayers.Control.PinchZoom(controls[control]));
                    break;
                case 'Scale':
                    this.addControlToMapAndSaveForReturn(control, new OpenLayers.Control.Scale(controls[control]));
                    break;
                case 'ScaleLine':
                    this.addControlToMapAndSaveForReturn(control, new OpenLayers.Control.ScaleLine(controls[control]));
                    break;
                case 'SelectFeature':
                    this.addControlToMapAndSaveForReturn(control, new OpenLayers.Control.SelectFeature(this.parent.Layer.getLayerByName(controls[control].layerName), controls[control]));
                    break;
                case 'SLDSelect':
                    //TODO: болванка SLDSelect
                    this.addControlToMapAndSaveForReturn(control, new OpenLayers.Control.SLDSelect(controls[control]));
                    break;
                case 'Snapping':
                    this.addControlToMapAndSaveForReturn(control, new OpenLayers.Control.Snapping(controls[control]));
                    break;
                case 'Split':
                    this.addControlToMapAndSaveForReturn(control, new OpenLayers.Control.Split(controls[control]));
                    break;
                case 'TouchNavigation':
                    this.addControlToMapAndSaveForReturn(control, new OpenLayers.Control.TouchNavigation(controls[control]));
                    break;
                case 'TransformFeature':
                    this.addControlToMapAndSaveForReturn(control, new OpenLayers.Control.TransformFeature(this.parent.Layer.getLayerByName(controls[control].layerName), controls[control]));
                    break;
                case 'UTFGrid':
                    //TODO: болванка UTFGrid
                    break;
                case 'WMSGetFeatureInfo':
                    //TODO: болванка WMSGetFeatureInfo
                    break;
                case 'WMTSGetFeatureInfo':
                    //TODO: болванка WMTSGetFeatureInfo
                    break;
                case 'Zoom':
                    this.addControlToMapAndSaveForReturn(control, new OpenLayers.Control.Zoom(controls[control]));
                    break;
                case 'ZoomBox':
                    this.addControlToMapAndSaveForReturn(control, new OpenLayers.Control.ZoomBox(controls[control]));
                    break;
                case 'ZoomIn':
                    this.addControlToMapAndSaveForReturn(control, new OpenLayers.Control.ZoomIn(controls[control]));
                    break;
                case 'ZoomOut':
                    this.addControlToMapAndSaveForReturn(control, new OpenLayers.Control.ZoomOut(controls[control]));
                    break;
                case 'ZoomPanel':
                    this.addControlToMapAndSaveForReturn(control, new OpenLayers.Control.ZoomPanel(controls[control]));
                    break;
                case 'ZoomToMaxExtent':
                    this.addControlToMapAndSaveForReturn(control, new OpenLayers.Control.ZoomToMaxExtent(controls[control]));
                    break;
                default:
                    this.parent.Console.writeWarning('Func: addControls | unexpected control type: ' + control);
                    break;
            }
        }
        return true;
    }
};
var defaultOptions = {
    mapOptions: {
        div: 'map',
        layers: [new OpenLayers.Layer.OSM()],
        projection: "EPSG:900913",
        maxResolution: '156543.0339',
        maxExtent: [-18924313.432222, -15538711.094146, 18924313.432222, 15538711.094146],
        restrictedExtent: [-13358338.893333, -9608371.5085962, 13358338.893333, 9608371.5085962],
        numZoomLevels: '21',
        theme: '../css/open-layers.tidy.css',
        displayProjection: "EPSG:4326",
        imgPath: '../images/OpenLayers/',
        zoom: 16
    },
    vehicleOptions: {
        label: 'default',
        id: 'default',
        display: '',
        projection: 'EPSG:4326'
    },
    trackOptions: {
        id: 'default',
        display: '',
        projection: 'EPSG: 4326',
        minInterval: 0.000001,
        maxInterval: 0.001
    }
};
/*
 Constructor: Layer
 Initialize the object of Layer.

 Parameters:
 parent - Object that is the parent of this class.

 Returns:
 Object of Layer.
 */
function Layer(parent) {
    this.parent = parent;
    return this;
}

Layer.prototype = {
    /*
     Function: addMap
     Creates the map elements and adds them to OpenLayers.

     Parameters:
     maps - Object which specifies a list of maps that are to be added to OpenLayers.

     Returns:
     TRUE if function successful.

     Usage:
     (start code)
     OpenLayersTools.Layer.addMap({
     'Google Maps': 'Google Streets'
     });
     (end code)
     */
    addMap: function (maps) {
        var layers = [];
        for (var map in maps) {
            switch (maps[map]) {
                case 'Google Physical':
                    layers.push(new OpenLayers.Layer.Google(map, {
                        type: google.maps.MapTypeId.TERRAIN
                    }));
                    break;
                case 'Google Streets':
                    layers.push(new OpenLayers.Layer.Google(map));
                    break;
                case 'Google Hybrid':
                    layers.push(new OpenLayers.Layer.Google(map, {
                        type: google.maps.MapTypeId.HYBRID
                    }));
                    break;
                case 'Google Satellite':
                    layers.push(new OpenLayers.Layer.Google(map, {
                        type: google.maps.MapTypeId.SATELLITE
                    }));
                    break;
                case 'Bing Aerial':
                    layers.push(new OpenLayers.Layer.Bing({
                        name: map,
                        type: 'Aerial',
                        key: "ArpBrjuWemAE1aBMYQUQp6e4PAy_hRI2L4yvUrRVacgaj-RQWJlqLn-LnkwgAuw9"
                    }));
                    break;
                case 'Bing Aerial Labels':
                    layers.push(new OpenLayers.Layer.Bing({
                        name: map,
                        type: 'AerialWithLabels',
                        key: "ArpBrjuWemAE1aBMYQUQp6e4PAy_hRI2L4yvUrRVacgaj-RQWJlqLn-LnkwgAuw9"
                    }));
                    break;
                case 'Bing Road':
                    layers.push(new OpenLayers.Layer.Bing({
                        name: map,
                        type: 'Road',
                        key: "ArpBrjuWemAE1aBMYQUQp6e4PAy_hRI2L4yvUrRVacgaj-RQWJlqLn-LnkwgAuw9"
                    }));
                    break;
                case 'OSM':
                    layers.push(new OpenLayers.Layer.OSM());
                    break;
                default:
                    this.parent.Console.writeWarning('Func: addMap | Wrong layer type! Please check your parameters in function addMap!');
                    break;
            }
        }
        if (layers.length != 0) {
            this.parent.Map.addLayers(layers);
            return true;
        } else {
            this.parent.Console.writeError('Func: addMap | The count of layers is 0! Check parameters for function addMap!');
            return false;
        }
    },
    /*
     Function: addVectorLayer
     Adding a custom layer to OpenLayers.

     Parameters:
     name - Name of a custom layer.
     config - The object with the parameters of the user layer.

     Returns:
     TRUE if function successful.

     Usage:
     (start code)
     OpenLayersTools.Layer.addVectorLayer('Транспортные средства', {
     styleMap: {
     default: {
     display: '${display}',
     label: '${label}',
     externalGraphic: '${externalGraphic}',
     graphicWidth: 32,
     graphicHeight: 32,
     graphicYOffset: -50
     }
     }
     });
     (end code)
     */
    addVectorLayer: function (name, config) {
        var parent = this.parent;

        function makeStyleAndPushToArray(renderIntent) {
            if (['default', 'select', 'temporary'].indexOf(renderIntent) === -1) {
                parent.Console.writeWarning('Func: addVectorLayer | Wrong render intent for style! Check parameters!');
                return false;
            }
            stylesMap[renderIntent] = new OpenLayers.Style(config.styleMap[renderIntent]);
            return true;
        }

        if (config.styleMap == undefined) {
            this.parent.Console.writeInfo('Func: addVectorLayer | StyleMap in config of addVectorLayer is empty! Set rules for StyleMap');
            return false;
        }

        var stylesMap = [];
        for (var style in config.styleMap) {
            if (!makeStyleAndPushToArray(style)) {
                this.parent.Console.writeWarning('Func: addVectorLayer | Error in makeStyleMap! Check addVectorLayer parameters!');
            }
        }
        stylesMap = new OpenLayers.StyleMap(stylesMap);
        config.styleMap = stylesMap;
        this.parent.Map.addLayer(new OpenLayers.Layer.Vector(name, config));
        return true;
    },
    /*
     Function: getLayerByName
     Seeking layer in OpenLayers and returns a single layer.

     Parameters:
     name - The name of the layer.

     Returns:
     OpenLayers.Layer.

     Usage:
     (start code)
     OpenLayersTools.Layer.getLayerByName(layerName);
     (end code)
     */
    getLayerByName: function (name) {
        var layer = this.parent.Map.getLayersByName(name)[0];
        if (layer == undefined) {
            this.parent.Console.writeError('Func: getLayerByName | Layer ' + name + ' doesn\'t exists!');
            return false;
        }
        return layer;
    },
    /*
     Function: getLayersByName
     Seeking layer in OpenLayers and returns array of layers.

     Parameters:
     name - The name of the layer.

     Returns:
     Array of OpenLayers.Layer.

     Usage:
     (start code)
     OpenLayersTools.Layer.getLayersByName(layerName);
     (end code)
     */
    getLayersByName: function (name) {
        var layers = this.parent.Map.getLayersByName(name);
        if (layers == undefined) {
            this.parent.Console.writeError('Func: getLayersByName | Layer ' + name + ' doesn\'t exists!');
            return false;
        }
        return layers;
    },
    /*
     Function: getFeatureById
     Takes out the element layer and return it.

     Parameters:
     layerName - Layer name from which to take the element layer.
     id - ID of the control to be found.

     Returns:
     OpenLayers.Feature.

     Usage:
     (start code)
     OpenLayersTools.Layer.getFeatureById(layerName, id);
     (end code)
     */
    getFeatureById: function (layerName, id) {
        var layer = this.getLayerByName(layerName);
        if (layer == undefined) {
            this.parent.Console.writeError('Func: getFeatureById | Layer ' + name + ' doesn\'t exists!');
            return false;
        }
        if (layer.features == undefined) {
            this.parent.Console.writeError('Func: getFeatureById | Layer ' + name + ' don\'t have features!');
            return false;
        }
        for (var feature in layer.features) {
            if (layer.features[feature] != undefined) {
                if (layer.features[feature].attributes.id == id) {
                    return layer.features[feature];
                }
            }
        }
        return false;
    },
    /*
     Function: getFeaturesById
     Takes out the element layer and return array of OpenLayers.Feature.

     Parameters:
     layerName - Layer name from which to take the elements layer.
     id - ID of the controls to be found.

     Returns:
     Array of OpenLayers.Feature.

     Usage:
     (start code)
     OpenLayersTools.Layer.getFeatureById(layerName, id);
     (end code)
     */
    getFeaturesById: function (layerName, id) {
        var layer = this.getLayerByName(layerName);
        var features = [];
        if (layer == undefined) {
            this.parent.Console.writeError('Func: getFeaturesById | Layer ' + name + ' doesn\'t exists!');
            return false;
        }
        if (layer.features == undefined) {
            this.parent.Console.writeError('Func: getFeaturesById | Layer ' + name + ' don\'t have features!');
            return false;
        }
        for (var feature in layer.features) {
            if (layer.features[feature] != undefined) {
                if (layer.features[feature].attributes.id == id) {
                    features.push(layer.features[feature]);
                }
            }
        }
        return features;
    }
};
/*
 Constructor: Track
 Initialize the object of Track.

 Parameters:
 parent - Object that is the parent of this class.

 Returns:
 Object of Track.
 */
function Track(parent) {
    this.parent = parent;
    return this;
}

Track.prototype = {
    /*
     Function: buildTrack
     Building a track, given the coordinates and draws on OpenLayers.Layer.

     Parameters:
     layerName - Name the layer to which you want to draw the track.
     coordinates - Object coordinates on which to build the track.
     attributes - Object which specifies the attribute track.

     Returns:
     TRUE if function successful.

     Usage:
     (start code)
     Coming soon...
     (end code)
     */
    buildTrack: function (layerName, coordinates, attributes) {
        if (this.parent.BaseFunc.checkUndefined(coordinates) || coordinates.length == 0) {
            this.parent.Console.writeError('Func: buildTrack | Coordinates is empty. Check parameters of function!');
            return false;
        }
        var layer = this.parent.Layer.getLayerByName(layerName);
        if (this.parent.BaseFunc.checkUndefined(layer) || !layer) {
            this.parent.Console.writeError('Func: buildTrack | Layer ' + layerName + 'doesn\'t exists!');
            return false;
        }
        attributes = this.parent.BaseFunc.extendConfigFromDefault(attributes, defaultOptions.trackOptions);
        var trackPoints = [];
        var lastAddedPoints = {
            longitude: 0,
            latitude: 0
        };
        var feature = null;
        for (var coord in coordinates) {
            if (this.parent.BaseFunc.checkUndefined(coordinates[coord].longitude) || this.parent.BaseFunc.checkUndefined(coordinates[coord].latitude)) {
                this.parent.Console.writeWarning('Func: buildTrack | Coordinates array have undefined coordinates! Please check array of coordinates in parameters of function!');
                continue;
            }
            if (coordinates[coord].latitude != lastAddedPoints.latitude && coordinates[coord].longitude != lastAddedPoints.longitude) {
                if ((Math.abs(coordinates[coord].longitude - lastAddedPoints.longitude) > attributes.minInterval) || Math.abs(coordinates[coord].latitude - lastAddedPoints.latitude) > attributes.minInterval) {
                    if ((Math.abs(coordinates[coord].longitude - lastAddedPoints.longitude) < attributes.maxInterval) || (Math.abs(coordinates[coord].latitude - lastAddedPoints.latitude) < attributes.maxInterval)) {
                        lastAddedPoints.longitude = coordinates[coord].longitude;
                        lastAddedPoints.latitude = coordinates[coord].latitude;
                        var point = new OpenLayers.Geometry.Point(coordinates[coord].longitude, coordinates[coord].latitude);
                        point.transform(new OpenLayers.Projection(attributes.projection), this.parent.Map.getProjectionObject());
                        trackPoints.push(point);
                    } else {
                        lastAddedPoints.longitude = coordinates[coord].longitude;
                        lastAddedPoints.latitude = coordinates[coord].latitude;
                        feature = new OpenLayers.Feature.Vector(new OpenLayers.Geometry.LineString(trackPoints), attributes);
                        layer.addFeatures(feature);
                        trackPoints = [];
                    }
                }
            }
        }
        if (trackPoints.length != 0) {
            feature = new OpenLayers.Feature.Vector(new OpenLayers.Geometry.LineString(trackPoints), attributes);
            layer.addFeatures(feature);
        }
        return true;
    },
    /*
     Function: removeTrack
     Remove track from the layer.

     Parameters:
     layerName - Name the layer to which you want to draw the track.
     trackId - ID of the track you want to delete.

     Returns:
     TRUE if function successful.

     Usage:
     (start code)
     Coming soon...
     (end code)
     */
    removeTrack: function (layerName, trackId) {
        var layer = this.parent.Layer.getLayerByName(layerName);
        if (this.parent.BaseFunc.checkUndefined(layer) || !layer) {
            this.parent.Console.writeError('Func: removeTrack | Layer ' + layerName + 'does\'t exists!');
            return false;
        }
        var feature = this.parent.Layer.getFeatureById(layerName, trackId);
        if (this.parent.BaseFunc.checkUndefined(feature) || !feature) {
            this.parent.Console.writeError('Func: removeTrack | Layer ' + layerName + 'doesn\'t have features with id ' + trackId);
            return false;
        }
        layer.removeFeatures(feature);
        return true;
    },
    /*
     Function: visibilityTrack
     Method hides\show track on layer.

     Parameters:
     layerName - Name the layer to which you want to draw the track.
     trackId - ID of the track you want to delete.
     visibility - Flag, which shows of hides the marker from the layer.

     Returns:
     TRUE if function successful.

     Usage:
     (start code)
     Coming soon...
     (end code)
     */
    visibilityTrack: function (layerName, trackId, visibility) {
        var layer = this.parent.Layer.getLayerByName(layerName);
        if (this.parent.BaseFunc.checkUndefined(layer) || !layer) {
            this.parent.Console.writeError('Func: removeTrack | Layer ' + layerName + 'does\'t exists!');
            return false;
        }
        var feature = this.parent.Layer.getFeatureById(layerName, trackId);
        if (this.parent.BaseFunc.checkUndefined(feature) || !feature) {
            this.parent.Console.writeError('Func: removeTrack | Layer ' + layerName + 'doesn\'t have features with id ' + trackId);
            return false;
        }
        if (visibility) {
            feature.attributes.display = '';
        } else {
            feature.attributes.display = 'none';
        }
        return true;
    }
};
/*
 Constructor: Vehicle
 Initialize the object of Vehicle.

 Parameters:
 parent - Object that is the parent of this class.

 Returns:
 Object of Vehicle.
 */
function Vehicle(parent) {
    this.parent = parent;
    return this;
}

Vehicle.prototype = {
    /*
     Function: addVehicle
     Creates and adds a marker of the vehicle on OpenLayers.Map

     Parameters:
     layerName - The layer name to which you want to add a marker.
     coordinates - Object coordinates of the vehicle.
     attributes - The object with the attributes of a marker.

     Returns:
     TRUE if function successful.
     */
    addVehicle: function (layerName, coordinates, attributes) {
        attributes = this.parent.BaseFunc.extendConfigFromDefault(attributes, defaultOptions.vehicleOptions);
        var layer = this.parent.Layer.getLayerByName(layerName);
        if (this.parent.BaseFunc.checkUndefined(layer) || !layer) {
            this.parent.Console.writeError('Func: addVehicle | Layer ' + layerName + ' doesn\'t exists!');
            return false;
        }
        var feature = this.parent.Layer.getFeatureById(layerName, attributes.id);
        if (!this.parent.BaseFunc.checkUndefined(feature) || feature) {
            this.parent.Console.writeWarning('Func: addVehicle | Layer ' + layerName + ' already have feature with this ID: ' + attributes.id + '!');
            return false;
        }
        var point = new OpenLayers.Geometry.Point(coordinates.longitude, coordinates.latitude);
        point.transform(new OpenLayers.Projection(attributes.projection), new OpenLayers.Projection(this.parent.Map.getProjectionObject()));
        layer.addFeatures(new OpenLayers.Feature.Vector(point, attributes));
        return true;
    },
    /*
     Function: moveVehicle
     Moves existing marker vehicle to new coordinates

     Parameters:
     layerName - The layer name to which you want to move a marker.
     vehicleId - ID of the vehicle to be moved.
     coordinates - Coordinates in which to move the marker.

     Returns:
     TRUE if function successful.
     */
    moveVehicle: function (layerName, vehicleId, coordinates) {
        var feature = this.parent.Layer.getFeatureById(layerName, vehicleId);
        if (this.parent.BaseFunc.checkUndefined(feature) || !feature) {
            this.parent.Console.writeError('Func: moveVehicle | Feature with id ' + vehicleId + ' doesn\'t exists on ' + layerName);
            return false;
        }
        var point = new OpenLayers.LonLat(coordinates.longitude, coordinates.latitude);
        point.transform(new OpenLayers.Projection(this.parent.MapOptions.displayProjection), this.parent.Map.getProjectionObject());
        feature.move(point);
        return true;
    },
    /*
     Function: removeVehicle
     Removes marker vehicle.

     Parameters:
     layerName - The layer name to which you want to remove a marker.
     vehicleId - ID of the vehicle to be removed.

     Returns:
     TRUE if function successful.
     */
    removeVehicle: function (layerName, vehicleId) {
        var layer = this.parent.Layer.getLayerByName(layerName);
        if (this.parent.BaseFunc.checkUndefined(layer) || !layer) {
            this.parent.Console.writeError('Func: removeVehicle | Layer ' + layerName + ' doesn\'t exists!');
            return false;
        }
        var feature = this.parent.Layer.getFeatureById(layerName, vehicleId);
        if (this.parent.BaseFunc.checkUndefined(feature) || !feature) {
            this.parent.Console.writeError('Func: removeVehicle | Feature ID ' + vehicleId + ' undefined on ' + layerName);
            return false;
        }
        layer.removeFeatures(feature);
        return true;
    },
    /*
     Function: visibilityVehicle
     Hides of displays the marker of the vehicle.

     Parameters:
     layerName - The layer name to which you want to hide\show a marker.
     vehicleId - ID of the vehicle to be hides\shows.
     visibility - A flag that indicates whether to hide or display the marker.

     Returns:
     TRUE if function successful.
     */
    visibilityVehicle: function (layerName, vehicleId, visibility) {
        var layer = this.parent.Layer.getLayerByName(layerName);
        if (this.parent.BaseFunc.checkUndefined(layer) || !layer) {
            this.parent.Console.writeError('Func: removeVehicle | Layer ' + layerName + ' doesn\'t exists!');
            return false;
        }
        var feature = this.parent.Layer.getFeatureById(layerName, vehicleId);
        if (this.parent.BaseFunc.checkUndefined(feature) || !feature) {
            this.parent.Console.writeError('Func: removeVehicle | Feature ID ' + vehicleId + ' undefined on ' + layerName);
            return false;
        }
        if (visibility) {
            feature.attributes.display = '';
        } else {
            feature.attributes.display = 'none';
        }
        layer.redraw();
        return true;
    }
};