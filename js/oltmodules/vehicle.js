/*
 Class: Vehicle
 */
function Vehicle(parent) {
    this.parent = parent;
    return this;
}

Vehicle.prototype = {
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