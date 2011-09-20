var map = {
  apiLoaded: function(api) {
    var places = getPlaces(api);
    var center = places[Math.round(Math.random() * (places.length - 1))]

    var controller = new CartografiasInfantis.Places.PlacesController()
      , map        = document.getElementById('map')
      , canvas     = new CartografiasInfantis.Map.MapCanvas(map, {zoom: 19});

    for (var i in places) {
      (function(workshop) {
        var marker = new CartografiasInfantis.Map.Marker(workshop);
        marker.registerObserver(function() { showWorkshop(workshop); }, 'marker:click');
        canvas.addMarker(marker);
      })(places[i]);
    }
    canvas.centerIn(center.coordinates);
  }
};

CartografiasInfantis.Map.ApiLoader.initialize(map);
CartografiasInfantis.Map.ApiLoader.loadApi();

