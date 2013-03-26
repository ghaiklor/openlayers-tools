function OpenLayersApplication() {
    this.vehicles = [];
    return this;
}

OpenLayersApplication.prototype = {
    addRandomVehicle: function () {
        var vehicleslist = $('#vehicles-list-select');
        var longitude = Math.random() * (50 - 20) + 20;
        var latitude = Math.random() * (50 - 20) + 20;
        var id = Math.floor(Math.random() * 1000000);
        Core.Objects.OpenLayersTools.Vehicle.addVehicle('Транспортные средства', {
            longitude: longitude,
            latitude: latitude
        }, {
            id: id,
            label: 'Testing Vehicle ' + id
        });
        Core.Objects.OpenLayersTools.BaseFunc.centerMap(longitude, latitude, 'EPSG:4326');
        this.vehicles[id] = {
            id: id,
            longitude: longitude,
            latitude: latitude
        };
        if ($(vehicleslist).find('option').first().html() == 'Список пуст...') {
            $(vehicleslist).html('');
        }
        $(vehicleslist).append($('<option value="id">' + id + '</option>'))
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
        this.Objects.OpenLayersTools.Layer.addVectorLayer('Транспортные средства', {
            styleMap: {
                default: {
                    display: '${display}',
                    label: '${label}',
                    externalGraphic: '${externalGraphic}'
                }
            }
        });
    }
};

$(document).ready(function () {
    Core.EntryPoint();
});