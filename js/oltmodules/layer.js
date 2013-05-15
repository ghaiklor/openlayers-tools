/*
 Class: OpenLayersTools.Layer
 Implements all the methods for working with layers of OpenLayers.
 */
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
            if (maps.hasOwnProperty(map)) {
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
            if (config.styleMap.hasOwnProperty(style)) {
                if (!makeStyleAndPushToArray(style)) {
                    this.parent.Console.writeWarning('Func: addVectorLayer | Error in makeStyleMap! Check addVectorLayer parameters!');
                }
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
            if (layer.features.hasOwnProperty(feature)) {
                if (layer.features[feature] != undefined) {
                    if (layer.features[feature].attributes.id == id) {
                        return layer.features[feature];
                    }
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
            if (layer.features.hasOwnProperty(feature)) {
                if (layer.features[feature] != undefined) {
                    if (layer.features[feature].attributes.id == id) {
                        features.push(layer.features[feature]);
                    }
                }
            }
        }
        return features;
    }
};