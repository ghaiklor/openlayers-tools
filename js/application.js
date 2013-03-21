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
        });
        this.Objects.OpenLayersTools.Control.addControls({
            LayerSwitcher: {
                controlType: 'LayerSwitcher',
                roundedCorner: true
            },
            MousePosition: {
                controlType: 'MousePosition'
            },
            OverviewMap: {
                controlType: 'OverviewMap',
                autoPan: true,
                maximized: false
            },
            PanPanel: {
                controlType: 'PanPanel'
            },
            PanZoomBar: {
                controlType: 'PanZoomBar'
            },
            Navigation: {
                controlType: 'Navigation'
            },
            ArgParser: {
                controlType: 'ArgParser'
            },
            Attribution: {
                controlType: 'Attribution'
            }
        });
        this.Objects.OpenLayersTools.BaseFunc.centerMap('20.00000', '30.00000', 'EPSG:4326');
    }
};


var documentReadyInterval = window.setInterval(function () {
    if (document.readyState == "complete") {
        Core.EntryPoint();
        window.clearInterval(documentReadyInterval);
    }
}, 100);
