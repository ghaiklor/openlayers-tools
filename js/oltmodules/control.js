/*
 Class: Control
 */
function Control(parent) {
    this.parent = parent;
    this.controls = [];
    return this;
}

Control.prototype = {
    addControlToMapAndSaveForReturn: function (index, control) {
        this.parent.Map.addControl(control);
        this.controls[index] = control;
    },
    addControls: function (controls) {
        for (var control in controls) {
            if (controls[control].controlType == undefined) {
                this.parent.Console.writeError('Func: addControls | You must specify controlType attribute in control parameters!');
                return false;
            }
            switch (controls[control].controlType) {
                case 'ArgParser':
                    this.addControlToMapAndSaveForReturn(control, new OpenLayers.Control.ArgParser(controls[control]));
                    break;
                case 'Attribution':
                    this.addControlToMapAndSaveForReturn(control, new OpenLayers.Control.Attribution(controls[control]));
                    break;
                case 'Button':
                    this.addControlToMapAndSaveForReturn(control, new OpenLayers.Control.Button(controls[control]));
                    break;
                case 'CacheRead':
                    this.addControlToMapAndSaveForReturn(control, new OpenLayers.Control.CacheRead(controls[control]));
                    break;
                case 'CacheWrite':
                    this.addControlToMapAndSaveForReturn(control, new OpenLayers.Control.CacheWrite(controls[control]));
                    break;
                case 'DragFeature':
                    this.addControlToMapAndSaveForReturn(control, new OpenLayers.Control.DragFeature(this.parent.Layer.getLayerByName(controls[control].layerName), controls[control]));
                    break;
                case 'DragPan':
                    this.addControlToMapAndSaveForReturn(control, new OpenLayers.Control.DragPan(controls[control]));
                    break;
                case 'DrawFeature':
                    this.addControlToMapAndSaveForReturn(control, new OpenLayers.Control.DrawFeature(this.parent.Layer.getLayerByName(controls[control].layerName), controls[control].OpenLayersHandler, controls[control]));
                    break;
                case 'EditingToolbar':
                    this.addControlToMapAndSaveForReturn(control, new OpenLayers.Control.EditingToolbar(this.parent.Layer.getLayerByName(controls[control].layerName), controls[control]));
                    break;
                case 'Geolocate':
                    this.addControlToMapAndSaveForReturn(control, new OpenLayers.Control.Geolocate(controls[control]));
                    break;
                case 'GetFeature':
                    this.addControlToMapAndSaveForReturn(control, new OpenLayers.Control.GetFeature(controls[control]));
                    break;
                case 'Graticule':
                    this.addControlToMapAndSaveForReturn(control, new OpenLayers.Control.Graticule(controls[control]));
                    break;
                case 'KeyboardDefaults':
                    this.addControlToMapAndSaveForReturn(control, new OpenLayers.Control.KeyboardDefaults(controls[control]));
                    break;
                case 'LayerSwitcher':
                    this.addControlToMapAndSaveForReturn(control, new OpenLayers.Control.LayerSwitcher(controls[control]));
                    break;
                case 'Measure':
                    this.addControlToMapAndSaveForReturn(control, new OpenLayers.Control.Measure(controls[control].OpenLayersHandler, controls[control]));
                    break;
                case 'ModifyFeature':
                    this.addControlToMapAndSaveForReturn(control, new OpenLayers.Control.ModifyFeature(this.parent.Layer.getLayerByName(controls[control].layerName), controls[control]));
                    break;
                case 'MousePosition':
                    this.addControlToMapAndSaveForReturn(control, new OpenLayers.Control.MousePosition(controls[control]));
                    break;
                case 'Navigation':
                    this.addControlToMapAndSaveForReturn(control, new OpenLayers.Control.Navigation(controls[control]));
                    break;
                case 'NavigationHistory':
                    this.addControlToMapAndSaveForReturn(control, new OpenLayers.Control.NavigationHistory(controls[control]));
                    break;
                case 'NavToolbar':
                    this.addControlToMapAndSaveForReturn(control, new OpenLayers.Control.NavToolbar(controls[control]));
                    break;
                case 'OverviewMap':
                    this.addControlToMapAndSaveForReturn(control, new OpenLayers.Control.OverviewMap(controls[control]));
                    break;
                case 'Pan':
                    this.addControlToMapAndSaveForReturn(control, new OpenLayers.Control.Pan(controls[control].direction, controls[control]));
                    break;
                case 'Panel':
                    this.addControlToMapAndSaveForReturn(control, new OpenLayers.Control.Panel(controls[control]));
                    break;
                case 'PanPanel':
                    this.addControlToMapAndSaveForReturn(control, new OpenLayers.Control.PanPanel(controls[control]));
                    break;
                case 'PanZoom':
                    this.addControlToMapAndSaveForReturn(control, new OpenLayers.Control.PanZoom(controls[control]));
                    break;
                case 'PanZoomBar':
                    this.addControlToMapAndSaveForReturn(control, new OpenLayers.Control.PanZoomBar(controls[control]));
                    break;
                case 'Permalink':
                    this.addControlToMapAndSaveForReturn(control, new OpenLayers.Control.Permalink(controls[control].element, controls[control].base, controls[control]));
                    break;
                case 'PinchZoom':
                    this.addControlToMapAndSaveForReturn(control, new OpenLayers.Control.PinchZoom(controls[control]));
                    break;
                case 'Scale':
                    this.addControlToMapAndSaveForReturn(control, new OpenLayers.Control.Scale(controls[control]));
                    break;
                case 'ScaleLine':
                    this.addControlToMapAndSaveForReturn(control, new OpenLayers.Control.ScaleLine(controls[control]));
                    break;
                case 'SelectFeature':
                    this.addControlToMapAndSaveForReturn(control, new OpenLayers.Control.SelectFeature(this.parent.Layer.getLayerByName(controls[control].layerName), controls[control]));
                    break;
                case 'SLDSelect':
                    //TODO: болванка SLDSelect
                    this.addControlToMapAndSaveForReturn(control, new OpenLayers.Control.SLDSelect(controls[control]));
                    break;
                case 'Snapping':
                    this.addControlToMapAndSaveForReturn(control, new OpenLayers.Control.Snapping(controls[control]));
                    break;
                case 'Split':
                    this.addControlToMapAndSaveForReturn(control, new OpenLayers.Control.Split(controls[control]));
                    break;
                case 'TouchNavigation':
                    this.addControlToMapAndSaveForReturn(control, new OpenLayers.Control.TouchNavigation(controls[control]));
                    break;
                case 'TransformFeature':
                    this.addControlToMapAndSaveForReturn(control, new OpenLayers.Control.TransformFeature(this.parent.Layer.getLayerByName(controls[control].layerName), controls[control]));
                    break;
                case 'UTFGrid':
                    //TODO: болванка UTFGrid
                    break;
                case 'WMSGetFeatureInfo':
                    //TODO: болванка WMSGetFeatureInfo
                    break;
                case 'WMTSGetFeatureInfo':
                    //TODO: болванка WMTSGetFeatureInfo
                    break;
                case 'Zoom':
                    this.addControlToMapAndSaveForReturn(control, new OpenLayers.Control.Zoom(controls[control]));
                    break;
                case 'ZoomBox':
                    this.addControlToMapAndSaveForReturn(control, new OpenLayers.Control.ZoomBox(controls[control]));
                    break;
                case 'ZoomIn':
                    this.addControlToMapAndSaveForReturn(control, new OpenLayers.Control.ZoomIn(controls[control]));
                    break;
                case 'ZoomOut':
                    this.addControlToMapAndSaveForReturn(control, new OpenLayers.Control.ZoomOut(controls[control]));
                    break;
                case 'ZoomPanel':
                    this.addControlToMapAndSaveForReturn(control, new OpenLayers.Control.ZoomPanel(controls[control]));
                    break;
                case 'ZoomToMaxExtent':
                    this.addControlToMapAndSaveForReturn(control, new OpenLayers.Control.ZoomToMaxExtent(controls[control]));
                    break;
                default:
                    this.parent.Console.writeWarning('Func: addControls | unexpected control type: ' + control);
                    break;
            }
        }
    }
};