describe('UI.WorkshopModal', function() {
  it('should have a configurable title', function() {
    var modal = new UI.WorkshopModal;
    modal.setTitle('Foo!');
    
    expect(modal.getElement()).toContainChildNode('h1');
    expect(modal.getElement()).toHaveContent('Foo!');
  });

  it('should have only one title', function() {
    var modal = new UI.WorkshopModal;
    modal.setTitle('Foo!');
    modal.setTitle('Bar!');

    expect(modal.getElement()).notToHaveContent('Foo!');
  });

  describe('renderPicture', function() {
    it('should render a picture', function() {
      var mockPicture = {foo:'bar'};
      var result = UI.WorkshopModal.renderPicture(mockPicture);
      
      expect(result).toContainChildNode('a img');
    });

    it('should get image source from Flickr', function() {
      spyOn(Flickr.Image, 'getURL').andReturn('foo.com/example.jpg');
      var mockPicture = {foo:'bar'};
      var result = UI.WorkshopModal.renderPicture(mockPicture);
        
      expect(Flickr.Image.getURL).toHaveBeenCalledWith(mockPicture);
      expect(result.find('img').attr('src')).toEqual('foo.com/example.jpg');
    });
  });
});
