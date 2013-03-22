function BaseFunc(parent) {
    this.parent = parent;
    return this;
}

BaseFunc.prototype = {
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
    centerMap: function (lon, lat, projection) {
        var point = new OpenLayers.LonLat(lon, lat);
        point.transform(new OpenLayers.Projection(projection), this.parent.Map.getProjectionObject());
        this.parent.Map.moveTo(point);
    },
    bindEventToObject: function (object, listeners) {
        if (object.events == undefined) {
            this.parent.Console.writeError('Func: bindEventToObject | Object don\'t have events callbacks!');
            return false;
        }
        object.events.on(listeners);
        return true;
    },
    checkUndefined: function (object) {
        if (object == undefined || object == null || object == '') {
            return true;
        } else {
            return false;
        }
    }
};