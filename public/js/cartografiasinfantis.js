var map = {
  apiLoaded: function(api) {
    var places = ['Parcão, Porto Alegre', 'Jardim Botânico, Porto Alegre']
      , center = places[Math.round(Math.random() * (places.length - 1))]

    api.geocodeAddress(center, function(place) {
      var map = new CartografiasInfantis.Map.Widget([])
        , element = document.getElementById('map');

      map.setCenter(api.getCoordinatesOf(place));
      map.renderIn(element);
    });
  }
};

CartografiasInfantis.Map.ApiLoader.initialize(map);
CartografiasInfantis.Map.ApiLoader.loadApi();



