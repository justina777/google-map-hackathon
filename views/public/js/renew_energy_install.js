function initMap(){
    // load the Trt map
    map = initTrtMap({ lat: 43.714452, lng: -79.288191 });

    setNightMode(map);
    // load the data of Toronto new renewable energy installations
    map.data.loadGeoJson('data/renewable_energy_installations.geojson');

    //TODO: add setStyle for map

}

window.initMap = initMap;