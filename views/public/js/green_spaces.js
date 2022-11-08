let map;

function initMap() {
    // load the Trt map
    map = initSatelliteMap({ lat: 43.7274114, lng: -79.2363336 }, 11.22);

    // load the data of ON green spaces
    map.data.loadGeoJson('data/green_space.geojson');

    map.data.setStyle({
        strokeColor: "#03a118",
        strokeOpacity: 0.5,
        strokeWeight: 2,
        fillColor: "#03a118",
        fillOpacity: 0.15
      });
}

window.initMap = initMap;