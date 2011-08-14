describe('UI.WorkshopModal', function() {
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
