describe('Places', function() {
  var ns = CartografiasInfantis
    , PlacesController = ns.Controllers.PlacesController;

  describe('PlacesController', function() {
    it('should select the given place', function() {
      var placeToBeSelected = {selected: false}
        , controller        = new PlacesController([placeToBeSelected]);

      controller.select(0);
      expect(placeToBeSelected.selected).toBeTruthy();
    });

    it('should unselect previously selected place', function() {
      var placeToBeUnselected = {selected: false}
        , controller          = new PlacesController([
            placeToBeUnselected,
            {selected: false}
          ]);
      
      controller.select(0);
      controller.select(1);
      expect(placeToBeUnselected.selected).toBeFalsy();
    });

    it('should notify observers of selected place', function() {
      var collection = [{selected: false}]
        , controller = new PlacesController(collection)
        , observer   = {placeSelected: jasmine.createSpy('Observer#placeSelected')};

      controller.registerObserver(observer, 'placeSelected');
      controller.select(0);
      expect(observer.placeSelected)
        .toHaveBeenCalledWith({selectedID: 0, places: collection});
    });
  });
});
