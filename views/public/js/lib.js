// plot the toronto area
function initTrtMap() {
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
    const trtArea = new google.maps.Polygon({
        paths: triangleCoords,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.05,
    });

    trtArea.setMap(map);

    return map;
}

// set to the night mode for a map
function setNightMode(map){
    map.setOptions({
        styles: [
            { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
            { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
            { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
            {
            featureType: "administrative.locality",
            elementType: "labels.text.fill",
            stylers: [{ color: "#d59563" }],
            },
            {
            featureType: "poi",
            elementType: "labels.text.fill",
            stylers: [{ color: "#d59563" }],
            },
            {
            featureType: "poi.park",
            elementType: "geometry",
            stylers: [{ color: "#263c3f" }],
            },
            {
            featureType: "poi.park",
            elementType: "labels.text.fill",
            stylers: [{ color: "#6b9a76" }],
            },
            {
            featureType: "road",
            elementType: "geometry",
            stylers: [{ color: "#38414e" }],
            },
            {
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [{ color: "#212a37" }],
            },
            {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [{ color: "#9ca5b3" }],
            },
            {
            featureType: "road.highway",
            elementType: "geometry",
            stylers: [{ color: "#746855" }],
            },
            {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [{ color: "#1f2835" }],
            },
            {
            featureType: "road.highway",
            elementType: "labels.text.fill",
            stylers: [{ color: "#f3d19c" }],
            },
            {
            featureType: "transit",
            elementType: "geometry",
            stylers: [{ color: "#2f3948" }],
            },
            {
            featureType: "transit.station",
            elementType: "labels.text.fill",
            stylers: [{ color: "#d59563" }],
            },
            {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#17263c" }],
            },
            {
            featureType: "water",
            elementType: "labels.text.fill",
            stylers: [{ color: "#515c6d" }],
            },
            {
            featureType: "water",
            elementType: "labels.text.stroke",
            stylers: [{ color: "#17263c" }],
            },
        ],
    });
}