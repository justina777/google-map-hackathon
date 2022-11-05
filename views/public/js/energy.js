let heatmap;
let year = 2015;
function initMap() {
    // load the Trt map
    map = initTrtMap({ lat: 43.7274114, lng: -79.2363336 }, 11.22);

    // set the night mode
    setNightMode(map);

    heatmap = new google.maps.visualization.HeatmapLayer({
        data: getPoints(),
        radius: 30,
        Opacity: 0.03,
      });
    heatmap.setMap(map);
    year += 1;
}
window.initMap = initMap;

const timeoutTrend = setInterval(loadTrend, 3000);

function loadTrend() {
    // console.log(year);
    heatmap.setMap(null);
    heatmap = new google.maps.visualization.HeatmapLayer({
        data: getPoints(year),
        radius: 30,
        Opacity: 0.03,
      });
    heatmap.setMap(map);
    year += 1;
    if (year > 2020){
        clearInterval(timeoutTrend);
    }
}

function getPoints(year){
    // console.log(document.getElementById('loc_data').innerText);
    var dataLocs = JSON.parse(document.getElementById('loc_data').innerText);
    // console.log(dataLocs);
    // console.log(dataLocs.locations.length);
    var locs = []
    if (year == null){
        year = 2015;
        
    }

    for(var i =0; i <dataLocs.locations.length; i++){
        if (dataLocs.locations[i].year != year){
            continue
        }
        if (parseFloat(dataLocs.locations[i].lng) == null || parseFloat(dataLocs.locations[i].lat) == null ){
            console.log(dataLocs.locations[i]);
            continue
        }
        var loc = {location: new google.maps.LatLng(dataLocs.locations[i].lat ,dataLocs.locations[i].lng),  weight: dataLocs.locations[i].weight/10};
        locs.push(loc);
    }
    // console.log(year, locs.length)
    return locs
}
