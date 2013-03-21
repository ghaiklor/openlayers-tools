function ApplicationEvents() {
    return this;
}

ApplicationEvents.prototype = {
    bindAllEvents: function () {
        $(window).resize(function () {
            Core.RecalcDOMSize();
        });
    }
};

var Core = {
    Config: {
        idLeftPanel: 'left-panel',
        idMapPanel: 'map-panel',
        idMainContainer: 'main-container',
        idMapContainer: 'map'
    },
    Objects: {
        OpenLayersTools: null,
        ApplicationEvents: null
    },
    RecalcDOMSize: function () {
        var width = $(window).width();
        var height = $(window).height();
        $('#' + this.Config.idMainContainer).css({
            width: width,
            height: height - 60
        })
        $('#' + this.Config.idLeftPanel).css({
            width: 200,
            height: height - 80
        });
        $('#' + this.Config.idMapPanel).css({
            height: height - 64,
            width: width - 214
        });
        $('#' + this.Config.idMapContainer).css({
            height: height - 64,
            width: width - 214
        })
    },
    EntryPoint: function () {
        this.RecalcDOMSize();

        this.Objects.ApplicationEvents = new ApplicationEvents();
        this.Objects.ApplicationEvents.bindAllEvents();

        this.Objects.OpenLayersTools = new OpenLayersTools();
        this.Objects.OpenLayersTools.checkModule();
        //TODO BUG: don't load images from images/OpenLayers.
        /*        this.Objects.OpenLayersTools.Control.addControls({
         LayerSwitcher: {
         controlType: 'LayerSwitcher',
         roundedCorner: true
         },
         MousePosition: {
         controlType: 'MousePosition'
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
         });*/
    }
};

$(document).ready(function () {
    Core.EntryPoint();
});