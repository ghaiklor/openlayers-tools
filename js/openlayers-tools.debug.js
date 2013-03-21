function OpenLayersTools(mapOptions) {
    this.BaseFunc = new BaseFunc(this);
    this.Console = new Console(this);
    this.Layer = new Layer(this);
    this.Control = new Control(this);
    this.MapOptions = this.BaseFunc.extendConfigFromDefault(mapOptions, defaultOptions.mapOptions);
    this.Map = new OpenLayers.Map(this.MapOptions);

    OpenLayers.imgPath = '../images/OpenLayers/';

    return this;
}

OpenLayersTools.prototype = {
    checkModule: function () {
        var messages = [];
        for (var obj in this) {
            messages.push(obj + ' exists!');
        }
        messages.push('OpenLayersTools Prototype exists! All is fine! :)');
        this.Console.writeGroup('Checking modules of OpenLayersTools', messages);
    }
};