
let map;

const citymap = {
    kensington_chinatown: {
      center: { lat: 43.653510, lng:  -79.395856 },
      population: 18505,
    },
    bay_corridor: {
      center: { lat: 43.660606, lng: -79.387618 },
      population: 18690,
    },
    church_yonge: {
      center: { lat: 43.673100, lng: -79.387800},
      population: 24900,
    },
    st_james_town: {
      center: { lat: 43.669974, lng: -79.373135 },
      population: 25860,
    },
  };
  

function initMap() {
    // load the Trt map
    map = initTrtMap();

    // Construct the circle for each value in citymap.
    // Note: We scale the area of the circle based on the population.
    for (const city in citymap) {
        // Add the circle for this city to the map.
        const cityCircle = new google.maps.Circle({
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
        map,
        center: citymap[city].center,
        radius: Math.sqrt(citymap[city].population) * 5,
        });
    }

    
}

let opacity = 0.1;
// window.initMap = initMap;
const tFadeIn = setInterval(fadeIn, 200);

function fadeIn()
{
    var element = document.getElementById('index-layer3-img');
    // console.log(element);
    opacity = opacity + 0.1;
    element.style.opacity = opacity 
    if(opacity >= 1) {
        opacity = 1.0;
        clearInterval(tFadeIn);
        console.log('remove interval');
    } 
}