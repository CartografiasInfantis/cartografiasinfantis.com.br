describe('CartografiasInfantis.Map', function() {
  var Map     = CartografiasInfantis.Map;
  var google  = {};

  describe('ApiLoader', function() {
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
});
