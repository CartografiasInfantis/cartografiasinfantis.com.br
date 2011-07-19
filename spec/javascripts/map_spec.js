describe('CartografiasInfantis.Map', function() {
  var Map     = CartografiasInfantis.Map;
  var google  = {};

  describe('ApiLoader', function() {
    afterEach(function() {
      google        = window.google;
      window.google = undefined;
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
});
