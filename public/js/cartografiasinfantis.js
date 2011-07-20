var map = {
  apiLoaded: function(api) {
    var map = new CartografiasInfantis.Map.Widget([])
      , element = document.getElementById('map');

    map.renderIn(element);
  }
};

CartografiasInfantis.Map.ApiLoader.initialize(map);
CartografiasInfantis.Map.ApiLoader.loadApi();



