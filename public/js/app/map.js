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

      var script = document.createElement("script");

      script.type = "text/javascript";
      script.src = "http://maps.google.com/maps/api/js?sensor=false&callback=" + callbackAlias;
      document.body.appendChild(script);
    }
  }
}


