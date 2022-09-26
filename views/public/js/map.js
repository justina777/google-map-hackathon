
let map;

// function initMap() {
// map = new google.maps.Map(document.getElementById("map"), {
//     center: { lat: -79.347015, lng: 43.651070 },
//     zoom: 8,
// });
// }
function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 43.651070, lng: -79.347015 },
        zoom: 13,
    });

    var kmlLayer = new google.maps.KmlLayer({
        url: 'http://googlemaps.github.io/kml-samples/kml/Placemark/placemark.kml',
        suppressInfoWindows: true,
        map: map
      });
    
      kmlLayer.addListener('click', function(kmlEvent) {
        var text = kmlEvent.featureData.description;
        showInContentWindow(text);
      });
    
      function showInContentWindow(text) {
        var sidediv = document.getElementById('content-window');
        sidediv.innerHTML = text;
      }
}

window.initMap = initMap;