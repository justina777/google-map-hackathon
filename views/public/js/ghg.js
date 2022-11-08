function initMap() {
    // load the Trt map
    map = initPreMap({ lat: 43.714452, lng: -79.288191 }, 10.95);

    // set colors for volume
    var colors = ['#9EC7E9', '#599241', '#1DAB75', '#117594', '#0C2E4C']
    
    // load the data of ON green spaces
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