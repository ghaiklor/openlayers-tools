var defaultOptions = {
    mapOptions: {
        div: 'map',
        layers: [new OpenLayers.Layer.OSM()],
        projection: "EPSG:900913",
        maxResolution: '156543.0339',
        maxExtent: [-18924313.432222, -15538711.094146, 18924313.432222, 15538711.094146],
        restrictedExtent: [-13358338.893333, -9608371.5085962, 13358338.893333, 9608371.5085962],
        numZoomLevels: '21',
        theme: '../css/open-layers.tidy.css',
        displayProjection: "EPSG:4326",
        imgPath: '../images/OpenLayers/',
        zoom: 16
    },
    vehicleOptions: {
        label: 'default',
        id: 'default',
        display: ''
    }
}