function OpenLayersApplication() {
    this.vehicles = [];
    return this;
}

OpenLayersApplication.prototype = {
    moveVehicle: function (id) {
        var result = window.prompt('Введите новые координаты:', '32.25366,48.51982').split(',');
        this.vehicles[id] = {
            longitude: result[0],
            latitude: result[1]
        };
        Core.Objects.OpenLayersTools.Vehicle.moveVehicle('Транспортные средства', id, {
            longitude: this.vehicles[id].longitude,
            latitude: this.vehicles[id].latitude
        });
    },
    removeVehicle: function (id) {
        Core.Objects.OpenLayersTools.Vehicle.removeVehicle('Транспортные средства', id);
        this.vehicles[id] = {};
        $('#vehicle-' + id).remove();
    },
    visibilityVehicle: function (obj, id) {
        if ($(obj).is(':checked')) {
            Core.Objects.OpenLayersTools.Vehicle.visibilityVehicle('Транспортные средства', id, true);
        } else {
            Core.Objects.OpenLayersTools.Vehicle.visibilityVehicle('Транспортные средства', id, false);
        }
    },
    centerVehicle: function (id) {
        Core.Objects.OpenLayersTools.BaseFunc.centerMap(this.vehicles[id].longitude, this.vehicles[id].latitude, 'EPSG:4326');
    },
    addRandomVehicle: function () {
        var vehicleslist = $('#vehicles-list');
        var longitude = Math.random() * (50 - 20) + 20;
        var latitude = Math.random() * (50 - 20) + 20;
        var id = Math.floor(Math.random() * 1000000);
        Core.Objects.OpenLayersTools.Vehicle.addVehicle('Транспортные средства', {
            longitude: longitude,
            latitude: latitude
        }, {
            id: id,
            label: 'Testing Vehicle ' + id,
            display: '',
            externalGraphic: './../../images/car.png'
        });
        Core.Objects.OpenLayersTools.BaseFunc.centerMap(longitude, latitude, 'EPSG:4326');
        this.vehicles[id] = {
            id: id,
            longitude: longitude,
            latitude: latitude
        };
        $(vehicleslist).append($('<li id="vehicle-' + id + '"><input type="checkbox" checked="checked" onclick="Core.Objects.OpenLayersApplication.visibilityVehicle($(this), ' + id + ');"/><a href="#" data-vehicle-id="' + id + '" onclick="Core.Objects.OpenLayersApplication.centerVehicle(' + id + ')">ID: ' + id + '</a><div class="vehicles-list-buttons"><a href="#" onclick="Core.Objects.OpenLayersApplication.moveVehicle(' + id + ')"><img src="./../images/move.png" alt="Move Vehicle" title="Передвинуть ТС"/></a><a href="#" onclick="Core.Objects.OpenLayersApplication.removeVehicle(' + id + ')"><img src="./../images/delete.png" alt="Remove Vehicle" title="Удалить ТС"/></a></div></li><div class="spacer"></div>'));
    }
};

function ApplicationEvents() {
    this.idAddRandomVehicleButton = 'addRandomVehicle';
    return this;
}

ApplicationEvents.prototype = {
    menuItemOnClick: function (obj) {
        $(obj).closest('li').siblings().removeClass('active-menu-item');
        $(obj).closest('li').addClass('active-menu-item');
        $('.left-panel > div').css('display', 'none');
        switch ($(obj).data('menu-item')) {
            case 'vehicles':
                $('.vehicles-demo').css('display', '');
                break;
            case 'tracks':
                $('.tracks-demo').css('display', '');
                break;
            default:
                break;
        }
    },
    addRandomVehicleButtonOnClick: function () {
        Core.Objects.OpenLayersApplication.addRandomVehicle();
    },
    bindAllEvents: function () {
        var self = this;
        $('#' + this.idAddRandomVehicleButton).click(function () {
            self.addRandomVehicleButtonOnClick();
        });
        $('.header li a').click(function () {
            self.menuItemOnClick($(this));
        });
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
        OpenLayersApplication: null,
        OpenLayersTools: null,
        ApplicationEvents: null
    },
    RecalcDOMSize: function () {
        var width = $(window).width();
        var height = $(window).height();
        $('#' + this.Config.idMainContainer).css({
            width: width,
            height: height - 60
        });
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
        $('.left-panel > div').css('display', 'none');
        $('.vehicles-demo').css('display', '');

        this.RecalcDOMSize();

        this.Objects.ApplicationEvents = new ApplicationEvents();
        this.Objects.ApplicationEvents.bindAllEvents();

        this.Objects.OpenLayersApplication = new OpenLayersApplication();

        this.Objects.OpenLayersTools = new OpenLayersTools({
            controls: []
        });
        this.Objects.OpenLayersTools.Control.addControls({
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
        });
        this.Objects.OpenLayersTools.Layer.addMap({
            'Google Maps': 'Google Streets'
        });
        this.Objects.OpenLayersTools.Layer.addVectorLayer('Транспортные средства', {
            styleMap: {
                default: {
                    display: '${display}',
                    label: '${label}',
                    externalGraphic: '${externalGraphic}',
                    graphicWidth: 32,
                    graphicHeight: 32,
                    graphicYOffset: -50
                }
            }
        });
    }
};

$(document).ready(function () {
    Core.EntryPoint();
});