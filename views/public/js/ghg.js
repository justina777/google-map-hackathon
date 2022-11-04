let map;

function initMap() {
    // load the Trt map
    // map = initMap();

    map = new google.maps.Map(document.getElementById("main-map"), {
        center: { lat: 43.714452, lng: -79.388191 },
        zoom: 11,
    });

    // var colors = ['#3366CC', '#DC3912', '#FF9900', '#109618', '#990099', '#3B3EAC', '#0099C6', '#DD4477', '#66AA00', '#B82E2E', '#316395', '#994499', '#22AA99', '#AAAA11', '#6633CC', '#E67300', '#8B0707', '#329262', '#5574A6', '#3B3EAC'];
    var colors = ['#9EC7E9', '#599241', '#1DAB75', '#117594', '#0C2E4C']
    
    // load the data of ON green spaces
    // map.data.loadGeoJson('data/city_wards_data.geojson');
    map.data.loadGeoJson('data/toronto_47_ward_model.geojson');

    // set stly for emission
    map.data.setStyle(function(feature) {
        var area = feature.getProperty('AREA_SHORT');
        var ghg = feature.getProperty('GHG_EMISSION');
        if (ghg > 1900){
            ghg = 4
        }else if (ghg <= 1900 && ghg > 1600){
            ghg = 3
        }
        else if (ghg <= 1600 && ghg > 1400){
            ghg = 2
        }
        else if (ghg <= 1400 && ghg > 1200){
            ghg = 1
        }
        else{
            ghg = 0
        }

        // var color = colors[area % colors.length]
        var color = colors[ghg]
        // if (area == 1) {
        //     color = 'red';
        // }
        // console.log(colors.length, area, color)

        return {
          strokeColor: "#333333",
          strokeOpacity: 0.5,
          fillColor: color,
          strokeWeight: 1,
          fillOpacity: 0.9,
        };
    });

}


window.initMap = initMap;