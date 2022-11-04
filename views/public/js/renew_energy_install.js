function initMap(){
    // load the Trt map
    map = initTrtMap();
    setNightMode(map);
    // load the data of Toronto new renewable energy installations
    map.data.loadGeoJson('data/renewable_energy_installations.geojson');

    //TODO: add setStyle for map

}

window.initMap = initMap;