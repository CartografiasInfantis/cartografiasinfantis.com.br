var CartografiasInfantis = window.CartografiasInfantis || {};

CartografiasInfantis.Map = Map = function() {  
}

Map.ApiLoader = function(map) {
  var self = this
    , _map = map;

  function getCallbackAlias() {
    var alias = 'callback' + Math.floor(Math.random() * 1000);  
    window[alias] = function() { 
      _map.apiLoaded.apply(_map);
    };
    return alias;
  }

  this.loadApi = function() {
    if (this.getApi()) return;

    var callbackAlias = getCallbackAlias(),
        script = document.createElement("script");

    script.type = "text/javascript";
    script.src = "http://maps.google.com/maps/api/js?sensor=false&callback=" + callbackAlias;
    document.body.appendChild(script);
  }

  this.getApi = function() {
    if (window.google && window.google.maps) {
      return window.google.maps;
    }

    return false;
  }
}



