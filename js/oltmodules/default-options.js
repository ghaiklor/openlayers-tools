var defaultOptions = {
    mapOptions: {
        div: 'map',
        projection: new OpenLayers.Projection("EPSG:900913"),
        maxResolution: '156543.0339',
        maxExtent: new OpenLayers.Bounds(-20037508, -20037508, 20037508, 20037508),
        restrictedExtent: new OpenLayers.Bounds(-20037508, -20037508, 20037508, 20037508),
        numZoomLevels: '16',
        theme: null,
        displayProjection: new OpenLayers.Projection("EPSG:4326"),
        imgPath: '../images/OpenLayers/',
        zoom: 5
    }
}

OpenLayers.imgPath = '../images/OpenLayers/';