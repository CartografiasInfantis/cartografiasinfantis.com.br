describe('Places', function() {
  var Places = CartografiasInfantis.Places;
    
  describe('PlacesController', function() {
    var controller;

    beforeEach(function() {
      controller = new Places.PlacesController();
    });
    
    it('should broadcast places added', function() {
      var mockObserver = jasmine.createSpy('Event observer')
        , addedPlace = new Places.Place();

      controller.registerObserver(mockObserver, 'places:added');
      controller.addPlace(addedPlace);

      expect(mockObserver).toHaveBeenCalledWith(addedPlace, controller);
    });
  });

  describe('GMapsDataSource', function() {
    var dataSource;

    beforeEach(function() {
      dataSource = new Places.GMapsDataSource();
    });

    it('should create places async with gmaps data of a given address', function() {
      var mockCallback = jasmine.createSpy('DataSource callback')
        , stubAddress = 'foo address'
        , stubCoordinates = {foo: 'coordinates'}
        , mockGeocoderResponse = {
            geometry: {location: stubCoordinates}
          };

      spyOn(Map.Api, 'geocodeAddress').andCallFake(function(addr, callback) {
        setTimeout(function() {
          callback.call(window, mockGeocoderResponse);
        }, 0);
      });

      dataSource.getPlaceData(stubAddress, mockCallback);

      waitsFor(function() { return mockCallback.wasCalled; });
      runs(function() {
        var callbackArgument = mockCallback.mostRecentCall.args[0];
        expect(callbackArgument instanceof Places.Place).toBeTruthy();
        expect(callbackArgument.coordinates).toEqual(stubCoordinates);
      });
    });
  });
});

