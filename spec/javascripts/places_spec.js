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
    var dataSource
      , mockPlaceResponse = {
        geometry: { location: {lat: function() {return 30}, lng: function() {return -20}} }
      };

    beforeEach(function() {
      dataSource = new Places.GMapsDataSource();

      spyOn(Map.Api, 'geocodeAddress')
        .andCallFake(function(address, callback) {
          setTimeout(function() {
            callback.call(callback, mockPlaceResponse);
          }, 0);
        });
    });

    it('should generate a place object from geocoded data', function() {
      var mockSource = mockPlaceResponse
        , generatedPlace;

      generatedPlace = dataSource.generatePlaceObject(mockSource);

      expect(generatedPlace instanceof Places.Place).toBeTruthy();
      expect(generatedPlace.coordinates).toEqual({lat: 30, lng: -20});
    });

    it('should create place from a given address and broadcast creation', function() {
      var mockCallback = jasmine.createSpy('DataSource#observer')
        , mockPlaceInstance = jasmine.any('object');

      spyOn(dataSource, 'generatePlaceObject')
        .andReturn(mockPlaceInstance);

      dataSource.registerObserver(mockCallback, 'place:generated');
      dataSource.getPlaceData('foo address');
      
      waitsFor(function() {
        return mockCallback.wasCalled;
      });
      runs(function() {
        expect(mockCallback).toHaveBeenCalledWith(mockPlaceInstance);
      });
    });
  });
});

