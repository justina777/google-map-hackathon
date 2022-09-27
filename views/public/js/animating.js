function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 43.714452, lng: -79.388191 },
        zoom: 11,
        // mapTypeId: "terrain",
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

    // Define the symbol, using one of the predefined paths ('CIRCLE')
    // supplied by the Google Maps JavaScript API.
    const lineSymbol = {
      path: google.maps.SymbolPath.CIRCLE,
      scale: 8,
      strokeColor: "#393",
    };
    // Create the polyline and add the symbol to it via the 'icons' property.
    const line = new google.maps.Polyline({
      path: [
        { lat: 43.797021, lng: -79.155070  },
        { lat: 43.665512, lng: -79.587374  },
      ],
      icons: [
        {
          icon: lineSymbol,
          offset: "100%",
        },
      ],
      map: map,
    });
  
    animateCircle(line);
  }
  
  // Use the DOM setInterval() function to change the offset of the symbol
  // at fixed intervals.
  function animateCircle(line) {
    let count = 0;
  
    window.setInterval(() => {
      count = (count + 1) % 200;
  
      const icons = line.get("icons");
  
      icons[0].offset = count / 2 + "%";
      line.set("icons", icons);
    }, 20);
  }
  
  window.initMap = initMap;