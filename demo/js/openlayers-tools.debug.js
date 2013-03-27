/*
 Class: OpenLayersTools
 The main class, which initializes all the necessary classes.
 This class contains all the modules requires by the object.
 */
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