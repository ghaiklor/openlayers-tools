function Layer(parent) {
    this.parent = parent;
    return this;
}

Layer.prototype = {
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
                    this.parent.Console.writeWarning('Wrong layer type! Please check your parameters in function addMap!');
                    break;
            }
        }
        if (layers.length != 0) {
            this.parent.Map.addLayers(layers);
            this.parent.Console.writeDebug('Layers is not null and it\'s added to OpenLayersTools.Map!');
            return true;
        } else {
            this.parent.Console.writeError('The count of layers is 0! Check parameters for function addMap!');
            return false;
        }
    },
    addVectorLayer: function (name, config) {
        var parent = this.parent;

        function makeStyleAndPushToArray(renderIntent) {
            if (['default', 'select', 'temporary'].indexOf(renderIntent) === -1) {
                parent.Console.writeWarning('Wrong render intent for style! Check parameters!');
                return false;
            }
            stylesMap[renderIntent] = new OpenLayers.Style(config.styleMap[renderIntent]);
            return true;
        }

        if (config.styleMap == undefined) {
            this.parent.Console.writeInfo('StyleMap in config of addVectorLayer is empty! Set rules for StyleMap');
            return false;
        }

        var stylesMap = [];
        for (var style in config.styleMap) {
            if (!makeStyleAndPushToArray(style)) {
                this.parent.Console.writeWarning('Error in makeStyleMap! Check addVectorLayer parameters!');
            }
        }
        stylesMap = new OpenLayers.StyleMap(stylesMap);
        config.styleMap = stylesMap;
        this.parent.Map.addLayer(new OpenLayers.Layer.Vector(name, config));
        return true;
    }
};