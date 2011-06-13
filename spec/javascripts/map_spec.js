describe('CartografiasInfantis.Map', function() {
  var Map = CartografiasInfantis.Map;

  describe('ApiLoader', function() {
    it('should call callback after API is loaded', function() {
      var obj = {apiLoaded: jasmine.createSpy('Map.apiLoaded')},
          loader = new Map.ApiLoader(obj);

      loader.loadApi();

      waitsFor(function() {
        return window.hasOwnProperty('google');
      });

      runs(function() {
        expect(obj.apiLoaded).toHaveBeenCalled();  
      });
    });
  });

});
