
let map;

// add a kml Lay on a map
function addKMLlayer() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 43.651070, lng: -79.347015 },
        zoom: 11,
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