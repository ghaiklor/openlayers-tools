function ApplicationEvents() {
    return this;
}

ApplicationEvents.prototype = {
    bindAllEvents: function () {

    }
};

var Core = {
    Config: {

    },
    Objects: {
        OpenLayersTools: null,
        ApplicationEvents: null
    },
    EntryPoint: function () {
        this.Objects.ApplicationEvents = new ApplicationEvents();
        this.Objects.ApplicationEvents.bindAllEvents();

        this.Objects.OpenLayersTools = new OpenLayersTools();
        this.Objects.OpenLayersTools.Layer.addMap({
            'OpenStreetMap': 'OSM'
        })
    }
};


var documentReadyInterval = window.setInterval(function () {
    if (document.readyState == "complete") {
        Core.EntryPoint();
        window.clearInterval(documentReadyInterval);
    }
}, 100);
