
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
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 43.714452, lng: -79.388191 },
        zoom: 11,
    });

    // Define the LatLng coordinates for the polygon's path.
    const triangleCoords = [
        { lat: 43.750405, lng: -79.638991 },
        { lat: 43.854970, lng: -79.170699 },
        { lat: 43.813860, lng: -79.152160 },
        { lat: 43.792055, lng: -79.118514 },
        { lat: 43.759332, lng: -79.151473 },
        { lat: 43.739988, lng: -79.197478 },
        { lat: 43.582520, lng: -79.543548 },
        { lat: 43.750405, lng: -79.638991 }
    ];
    // Construct the polygon.
    const bermudaTriangle = new google.maps.Polygon({
        paths: triangleCoords,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.05,
    });

    bermudaTriangle.setMap(map);

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

window.initMap = initMap;