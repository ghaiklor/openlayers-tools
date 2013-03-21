function OpenLayersTools(mapOptions) {
    this.BaseFunc = new BaseFunc();
    this.Console = new Console();
    this.Layer = new Layer();
    this.MapOptions = this.BaseFunc.extendConfigFromDefault(mapOptions, defaultOptions.mapOptions);
    this.Map = new OpenLayers.Map(this.MapOptions);

    return this;
}

OpenLayersTools.prototype = {
    checkModule: function () {
        for (var obj in this) {
            this.Console.writeInfo(obj + ' exists!');
        }
        this.Console.writeInfo('OpenLayersTools exists!');
    }
};