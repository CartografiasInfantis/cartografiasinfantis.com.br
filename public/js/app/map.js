var CartografiasInfantis = window.CartografiasInfantis || {};

var Map = CartografiasInfantis.Map = {};

Map.Api = {
  getApi: function() {
    var loaded = 
      window.google 
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
  renderMap: function(element, options) {
    var api = this.getApi()

    return new api.Map(element, options || {});
  },
  geocodeAddress: function(address, callback) {
    var api = this.getApi();

    (new api.Geocoder()).geocode({address: address}, function() { 
      callback.call(callback, arguments[0][0]); 
    });
  },
  renderMapMarker: function(map, markerData) {
    var api = this.getApi()
      , marker = new api.Marker({
          position: this.getCoordinates(markerData.coordinates.lat, markerData.coordinates.lng)
          });

    marker.setMap(map);
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

Map.MapCanvas = function(element, options) {
  options = options || {};
  this.getElement = function() {return element}
  this.options = {
    backgroundColor: '#33bbdd',
    mapTypeId: Map.Api.getMapType('satellite'),
    streetViewControl: false,
    zoom: options.zoom || 4
  };
  this.map = Map.Api.renderMap(this.getElement(), this.options);
}

Map.MapCanvas.prototype = {
  addMarker: function(marker) {
    marker.marker.setMap(this.map);
  },
  centerIn: function(coordinates) {
    this.map.setCenter(coordinates);
  }
};

Map.Marker = function(props) {
  this.coordinates = props.coordinates;
  Map.Marker.createObject(this);
}

Map.Marker.createObject = function(instance) {
  var api = Map.Api.getApi()
    , events = ['click', 'mouseover', 'mouseout']
    , marker;
  
  marker = new api.Marker({
    position: instance.coordinates,
    map: null,
    flat: true
  });

  for (var i = events.length; --i >= 0;) {
    (function(e) {
      api.event.addListener(marker, e, 
        function() {
          instance.broadcast('marker:' + e, [instance]);
        });
    })(events[i]);
  }

  instance.marker = marker;
}

Map.Marker.prototype = new CartografiasInfantis.Broadcaster;

