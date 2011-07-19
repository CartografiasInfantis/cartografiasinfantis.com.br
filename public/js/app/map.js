var CartografiasInfantis = window.CartografiasInfantis || {};

CartografiasInfantis.Map = Map = function() {
   
}

Map.Api = {
  getApi: function() {
    var loaded = 
      window.hasOwnProperty('google') 
      && window.google.hasOwnProperty('maps');

    if (loaded) return window.google.maps;
  }
}

Map.ApiLoader = {
  URL: "http://maps.google.com/maps/api/js?sensor=false",
  initialize: function(map) {
    var self = this
      , _map = map
      , callbackAlias = 'callback' + Math.floor(Math.random() * 1000)
      , callback = function() { 
          _map.apiLoaded.apply(_map, [Map.Api.getApi()]);
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

Map.create = function (element){
  var map = Object.create(Map.prototype),
      mapView;

  map.getElement = function() {
    return element;
  }

  map.getMapView = function() {
    if (!mapView) mapView = Map.MapView.create(map);
    return mapView;
  }

  return map;
}

Map.DSL = {
  getCoordinate: function(lat, lng) {
    return new google.maps.LatLng(lat, lng);
  },
  getMapType: function(type) {
    return google.maps.MapTypeId[type.toUpperCase()];
  },
  renderMap: function(opts) {
    var element = this.getElement()
      , defaultOpts = {
          mapTypeId: this.getMapType('terrain'),
          center: this.getCoordinate(0, 0),
          zoom: 10
        };

    return new google.maps.Map(element, opts || defaultOpts);
  },
  addMarker: function() {
  }
}

Map.MapView = {};
Map.MapView.create = function(control) {
  var view = Object.create(Map.DSL);
  view.getElement = control.getElement;

  return view;
}

Map.prototype = {
  render: function() {
    this.getMapView().renderMap();
  }
}
