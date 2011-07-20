var CartografiasInfantis = window.CartografiasInfantis || {};

var Map = CartografiasInfantis.Map = {};

Map.Api = {
  getApi: function() {
    var loaded = 
      window.hasOwnProperty('google') 
      && window.google.hasOwnProperty('maps');

    if (loaded) return window.google.maps;
  },
  getCoordinates: function(lat, lng) {
    var api = this.getApi();
    return new api.LatLng(lat, lng);
  },
  getCoordinatesOf: function(place) {
    return place.geometry.location;
  },
  getMapType: function(type) {
    var api = this.getApi();
    return api.MapTypeId[type.toUpperCase()];
  },
  renderMap: function(element, opts) {
    var api = this.getApi()
      , defaultOpts = {
          mapTypeId: this.getMapType('terrain'),
          center: this.getCoordinates(0, 0),
          zoom: 10
        };

    return new api.Map(element, opts || defaultOpts);
  },
  geocodeAddress: function(address, callback) {
    var api = this.getApi();

    (new api.Geocoder()).geocode({address: address}, function() { 
      callback.call(callback, arguments[0][0]); 
    });
  }
}

Map.ApiLoader = {
  URL: "http://maps.google.com/maps/api/js?sensor=false",
  initialize: function(map) {
    var self = this
      , _map = map
      , callbackAlias = 'callback' + Math.floor(Math.random() * 1000)
      , callback = function() { 
          _map.apiLoaded.apply(_map, [Map.Api]);
        };

    window[callbackAlias] = callback;

    this.loadApi = function() {
      if (Map.Api.getApi() != undefined) { 
        setTimeout(callback, 0);
        return;
      }

      App.loadScript(Map.ApiLoader.URL + "&callback=" + callbackAlias);
    }
  }
}

Map.Widget = function(collection) {
  this.collection = collection;
};

Map.Widget.prototype = {
  renderIn: function(element) {
    Map.Api.renderMap(element);
    
    for (var i = this.collection.length; --i >= 0;) {
      
    }
  }
}
