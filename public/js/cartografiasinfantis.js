var map = {
  apiLoaded: function(api) {
    var places = ['Parcão, Porto Alegre', 'Jardim Botânico, Porto Alegre']
      , center = places[Math.round(Math.random() * (places.length - 1))]

    var dataSource = new CartografiasInfantis.Places.GMapsDataSource()
      , controller = new CartografiasInfantis.Places.PlacesController()
      , map        = document.getElementById('map')
      , canvas     = new CartografiasInfantis.Map.MapCanvas(map)

    dataSource.registerObserver(
        function() { 
          controller.addPlace.apply(controller, arguments); 
        }, 
        'place:generated');
    controller.registerObserver(
        function(place, controller) {
          var modal = qwery('.workshop')[0];
          bonzo(qwery('.overlay')).removeClass('hidden');
          bonzo(qwery('h1', modal)[0]).text(place.name);
          bonzo(modal).removeClass('hidden');
        },
        'places:selected');
    controller.registerObserver(
        function(place, controller) { 
          var marker = new CartografiasInfantis.Map.Marker(place);
          marker.registerObserver(function() { controller.select(place) }, 'marker:click');
          canvas.addMarker(marker); 
          canvas.centerIn(arguments[0].coordinates);
        },
        'places:added');

    for (var i in places) {
      dataSource.getPlaceData(places[i]);
    }
  }
};

CartografiasInfantis.Map.ApiLoader.initialize(map);
CartografiasInfantis.Map.ApiLoader.loadApi();



