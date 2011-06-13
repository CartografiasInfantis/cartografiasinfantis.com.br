var CartografiasInfantis = window.CartografiasInfantis || {};

CartografiasInfantis.Map = Map = function() {  
  this.apiLoader = new Map.ApiLoader(this);

  this.setup = function() {
    this.apiLoader.loadApi();
  }
}

Map.ApiLoader = function(Map) {
  var self = this;

  function getCallbackAlias() {
    var alias = 'callback' + Math.floor(Math.random() * 1000);  
    window[alias] = function() { 
      Map.apiLoaded.apply(Map);
    };
    return alias;
  }

  this.loadApi = function() {
    if (window.google && window.google.maps) return;

    var callbackAlias = getCallbackAlias(),
        script = document.createElement("script");

    script.type = "text/javascript";
    script.src = "http://maps.google.com/maps/api/js?sensor=false&callback=" + callbackAlias;
    document.body.appendChild(script);
  }
}
