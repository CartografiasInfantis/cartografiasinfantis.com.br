describe('CartografiasInfantis.Map', function() {
  var Map = CartografiasInfantis.Map;

  var spyOnMapApi = function() {
    for (var i in Map.Api) {
      if (Map.Api.hasOwnProperty(i)) {
        !!jasmine.isSpy(Map.Api[i]) ?
          Map.Api[i].reset() 
          : spyOn(Map.Api, i);
      }
    }
  }

  var addMapMatchers = function() {
    this.addMatchers({
      toBeMap: function() {
        return (
          Map.Api.renderMap.wasCalled && 
          Map.Api.renderMap.mostRecentCall.args[0] == this.actual
        );
      }
      ,toHaveMarkerInCoordinates: function(lat, lng) {
        var apiMethodCalls = Map.Api.renderMapMarker.calls
          , callArgs
          , match = false;
        for (var i = apiMethodCalls.length; --i >= 0;) {
          callArgs = apiMethodCalls[i].args;
          match = (
            callArgs[0] == this.actual &&
            callArgs[1].coordinates.lat == lat &&
            callArgs[1].coordinates.lng == lng
          );

          if (match) break;
        }

        return match;
      }
    });
  }

  beforeEach(spyOnMapApi);
  beforeEach(addMapMatchers);

  describe('ApiLoader', function() {
    var google;

    beforeEach(function() {
      google = window.google;
      delete window.google;
    });

    afterEach(function() {
      window.google = google;
    });

    it('should call callback after API is loaded', function() {
      var obj = {apiLoaded: jasmine.createSpy('Map.apiLoaded')};

      Map.ApiLoader.initialize(obj);
      Map.ApiLoader.loadApi();

      waitsFor(function() {
        return window.hasOwnProperty('google');
      });

      runs(function() {
        expect(obj.apiLoaded).toHaveBeenCalledWith(Map.Api);  
      });
    });
  });

  describe('MapCanvas', function() {
    var mockElement
      , generatedMap;

    beforeEach(function() {
      mockElement  = document.createElement('div');
      generatedMap = {};
      Map.Api.renderMap.andReturn(generatedMap);
    });

    it('should render maps in the container', function() {
      var canvas = new Map.MapCanvas(mockElement);
      canvas.paintIn(mockElement);
      expect(mockElement).toBeMap();
    });

    it('should render added markers', function() {
      var mockMarkerFoo = {coordinates: {lat: -31.22, lng: -50.31}}
        , mockMarkerBar = {coordinates: {lat:  20.22, lng:  60.34}}
        , canvas = new Map.MapCanvas();

      canvas.addMarker(mockMarkerFoo);
      canvas.addMarker(mockMarkerBar);

      canvas.paintIn(mockElement);
      expect(generatedMap).toHaveMarkerInCoordinates(-31.22, -50.31);
      expect(generatedMap).toHaveMarkerInCoordinates( 20.22,  60.34);
    });
  });
});
