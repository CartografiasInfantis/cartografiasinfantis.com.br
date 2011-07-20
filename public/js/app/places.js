var CartografiasInfantis = window.CartografiasInfantis || {}
  , Map = CartografiasInfantis.Map
  , Places = CartografiasInfantis.Places = {};


Places.Place = function(props) {
  props = props || {};
  this.coordinates = props.coordinates || {};
  this.name = props.name || '';
}

Places.PlacesController = function() {
  var methods = Places.PlacesController.InstanceMethods;
  
  for (var i in methods) {
    if (methods.hasOwnProperty(i)) {
      this[i] = methods[i];
    }
  }

  this.collection = [];
}

Places.PlacesController.prototype = new CartografiasInfantis.Broadcaster();

Places.PlacesController.InstanceMethods = {
  addPlace: function(place) {
    this.collection.push(place);
    this.broadcast('places:added', [place, this]);
  }
}

Places.GMapsDataSource = function() {
}

Places.GMapsDataSource.prototype = {
  getPlaceData: function(address, callback) {
    Map.Api.geocodeAddress(address, function(placeData) {
      var place = new Places.Place({
        coordinates: Map.Api.getCoordinatesOf(placeData),
        name: address
      });

      callback.call(window, place);
    });
  }
}
