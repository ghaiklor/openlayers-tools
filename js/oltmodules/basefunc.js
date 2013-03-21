function BaseFunc() {
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
    }
}