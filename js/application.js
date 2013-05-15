function OpenLayersApplication() {
    this.vehicles = [];
    this.tracks = [];
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
    moveTrack: function (id) {
        alert("Track is not draggable thing. What are you thinking about?");
    },
    removeVehicle: function (id) {
        Core.Objects.OpenLayersTools.Vehicle.removeVehicle('Транспортные средства', id);
        this.vehicles[id] = {};
        $('#vehicle-' + id).remove();
    },
    removeTrack: function (id) {
        Core.Objects.OpenLayersTools.Track.removeTrack('Треки', id);
        this.tracks[id] = {};
        $('#track-' + id).remove();
    },
    visibilityVehicle: function (obj, id) {
        if ($(obj).is(':checked')) {
            Core.Objects.OpenLayersTools.Vehicle.visibilityVehicle('Транспортные средства', id, true);
        } else {
            Core.Objects.OpenLayersTools.Vehicle.visibilityVehicle('Транспортные средства', id, false);
        }
    },
    visibilityTrack: function (obj, id) {
        if ($(obj).is(':checked')) {
            Core.Objects.OpenLayersTools.Track.visibilityTrack('Треки', id, true);
        } else {
            Core.Objects.OpenLayersTools.Track.visibilityTrack('Треки', id, false);
        }
    },
    centerVehicle: function (id) {
        Core.Objects.OpenLayersTools.BaseFunc.centerMap(this.vehicles[id].longitude, this.vehicles[id].latitude, 'EPSG:4326');
    },
    centerTrack: function (id) {
        Core.Objects.OpenLayersTools.BaseFunc.centerMap(this.tracks[id].longitude, this.tracks[id].latitude, 'EPSG:4326');
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
            externalGraphic: './images/car.png'
        });
        Core.Objects.OpenLayersTools.BaseFunc.centerMap(longitude, latitude, 'EPSG:4326');
        this.vehicles[id] = {
            id: id,
            longitude: longitude,
            latitude: latitude
        };
        $(vehicleslist).append($('<li id="vehicle-' + id + '"><input type="checkbox" checked="checked" onclick="Core.Objects.OpenLayersApplication.visibilityVehicle($(this), ' + id + ');"/><a href="#" data-vehicle-id="' + id + '" onclick="Core.Objects.OpenLayersApplication.centerVehicle(' + id + ')">ID: ' + id + '</a><div class="vehicles-list-buttons"><a href="#" onclick="Core.Objects.OpenLayersApplication.moveVehicle(' + id + ')"><img src="./images/move.png" alt="Move Vehicle" title="Передвинуть ТС"/></a><a href="#" onclick="Core.Objects.OpenLayersApplication.removeVehicle(' + id + ')"><img src="./images/delete.png" alt="Remove Vehicle" title="Удалить ТС"/></a></div></li><div class="spacer"></div>'));
    },
    buildRandomTrack: function () {
        var trackList = $('#track-list');
        var id = Math.floor(Math.random() * 1000000);
        var points = [];
        var length = Math.random() * (500 - 100) + 100;
        var lastPoint = {
            longitude: Math.floor(Math.random() * (50 - 20) + 20),
            latitude: Math.floor(Math.random() * (50 - 20) + 20)
        };
        for (var point = 0; point < length; point++) {
            if (Math.random() < 0.5) {
                lastPoint.longitude = lastPoint.longitude + (Math.random() * 0.01);
            } else {
                lastPoint.longitude = lastPoint.longitude - (Math.random() * 0.01);
            }
            if (Math.random() < 0.5) {
                lastPoint.latitude = lastPoint.latitude + (Math.random() * 0.01);
            } else {
                lastPoint.latitude = lastPoint.latitude - (Math.random() * 0.01);
            }
            points.push({
                longitude: lastPoint.longitude,
                latitude: lastPoint.latitude
            });
        }
        Core.Objects.OpenLayersTools.Track.buildTrack('Треки', points, {
            id: id,
            label: 'Testing Track ' + id,
            display: '',
            maxInterval: 5,
            minInterval: 0.0001,
            projection: 'EPSG:4326'
        });
        Core.Objects.OpenLayersTools.BaseFunc.centerMap(lastPoint.longitude, lastPoint.latitude, 'EPSG:4326');
        this.tracks[id] = {
            id: id,
            longitude: lastPoint.longitude,
            latitude: lastPoint.latitude
        };
        $(trackList).append($('<li id="track-' + id + '"><input type="checkbox" checked="checked" onclick="Core.Objects.OpenLayersApplication.visibilityTrack($(this), ' + id + ');"/><a href="#" data-track-id="' + id + '" onclick="Core.Objects.OpenLayersApplication.centerTrack(' + id + ')">ID: ' + id + '</a><div class="track-list-buttons"><a href="#" onclick="Core.Objects.OpenLayersApplication.moveTrack(' + id + ')"><img src="./images/move.png" alt="Move Vehicle" title="Передвинуть трек"/></a><a href="#" onclick="Core.Objects.OpenLayersApplication.removeTrack(' + id + ')"><img src="./images/delete.png" alt="Remove Track" title="Удалить трек"/></a></div></li><div class="spacer"></div>'));
    }
};

function ApplicationEvents() {
    this.idAddRandomVehicleButton = 'addRandomVehicle';
    this.idAddRandomTrackButton = 'addRandomTrack';
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
    addRandomTrackButtonOnClick: function () {
        Core.Objects.OpenLayersApplication.buildRandomTrack();
    },
    bindAllEvents: function () {
        var self = this;
        $('#' + this.idAddRandomVehicleButton).click(function () {
            self.addRandomVehicleButtonOnClick();
        });
        $('.header li a').click(function () {
            self.menuItemOnClick($(this));
        });
        $('#' + this.idAddRandomTrackButton).click(function () {
            self.addRandomTrackButtonOnClick();
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
            controls: [],
            zoom: 6
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
        this.Objects.OpenLayersTools.Layer.addVectorLayer('Треки', {
            styleMap: {
                default: {
                    display: '${display}',
                    label: '${label}',
                    strokeWidth: 2
                }
            }
        })
    }
};

$(document).ready(function () {
    Core.EntryPoint();
});