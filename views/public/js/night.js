function initMap() {
    // load the Trt map
    map = initTrtMap();

    // set the night mode
    setNightMode(map);

  }
  
  window.initMap = initMap;