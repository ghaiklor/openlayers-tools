function EntryPoint() {
    window.OpenLayersTools = new OpenLayersTools();

    OpenLayersTools.Console.writeDebug('Using of OpenLayersTools object initialized');
    OpenLayersTools.checkModule();
}

var documentReadyInterval = window.setInterval(function () {
    if (document.readyState == "complete") {
        EntryPoint();
        window.clearInterval(documentReadyInterval);
    }
}, 100);
