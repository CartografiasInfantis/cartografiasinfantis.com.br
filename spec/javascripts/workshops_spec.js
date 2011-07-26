describe('CartografiasInfantis.Workshops', function() {
  var Workshops = CartografiasInfantis.Workshops;

  describe('FlickrPhotosetDataSource', function() {
    var mockAjaxResponse = {
          "photosets": {
            "photoset": [
              {"id": "1234foo", 
               "title": {"_content": "OFICINA: Parcão de Farofa"}},
              {"id": "5678bar", 
               "title": {"_content": "OFICINA: Praia do Pão de Leite"}},
            ]}}
      , mockWorkshopCollection = [
          new Workshops.Workshop({place: "Parcão de Farofa", flickrID: "1234foo"}),
          new Workshops.Workshop({place: "Praia do Pão de Leite", flickrID: "5678bar"})
        ];

    reqwest = function(params) {
      setTimeout(function() {
        params.success.apply(params.success, [mockAjaxResponse]);
      }, 0);
    };


    it('should generate workshops from flickr response', function() {
      var dataSource = new Workshops.FlickrPhotosetDataSource()
        , mockCallback = jasmine.createSpy('DataSource#callback');

      dataSource.registerObserver(mockCallback, 'workshop:generated');
      dataSource.getWorkshopData({user_id: 'foobar'});

      waitsFor(function() { return mockCallback.wasCalled; });
      runs(function() {
        expect(mockCallback).toHaveBeenCalledWith(mockWorkshopCollection);
      });
    });
  });
});
