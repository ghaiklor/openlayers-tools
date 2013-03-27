/*
 Class: Track
 Implements methods for working with tracks.
 */
/*
 Constructor: Track
 Initialize the object of Track.

 Parameters:
 parent - Object that is the parent of this class.
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