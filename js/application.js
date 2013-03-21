function EntryPoint() {
    window.OpenLayersTools = new OpenLayersTools();

    OpenLayersTools.checkModule();
//TODO: Realize adding maps on OpenLayers.Map
    OpenLayersTools.Layer.addMap({
        'test': 'test',
        'test2': 'test2'
    })
}

var documentReadyInterval = window.setInterval(function () {
    if (document.readyState == "complete") {
        EntryPoint();
        window.clearInterval(documentReadyInterval);
    }
}, 100);
