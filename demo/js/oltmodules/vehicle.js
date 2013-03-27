/*
 Class: OpenLayersTools.Vehicle
 Implements methods for working with vehicles.
 */
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