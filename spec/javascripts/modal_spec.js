describe('UI.Modal', function() {
  var UI = CartografiasInfantis.UI;

  it('should have a base element', function() {
    var modal = UI.Modal.create();
    
    expect(modal.getElement()[0].tagName).toBeDefined();
  });

  it('should be added to the specified container', function() {
    var mockContainer = $('<container>');
    var modal = UI.Modal.create();
    modal.container = mockContainer;
    modal.open();

    expect(mockContainer).toContainChildNode(modal.getElement()[0]);
  });

  it('should be added to body if no container when opened', function() {
    var modal = UI.Modal.create();
    modal.open();

    expect($('body')).toContainChildNode(modal.getElement()[0]);
  });


  it('should have a configurable title', function() {
    var modal = UI.Modal.create();

    modal.setTitle('Foo!');
    expect(modal.getElement()).toHaveContent('Foo!');

    modal.setTitle('Bar!');
    expect(modal.getElement()).notToHaveContent('Foo!');
    expect(modal.getElement()).toHaveContent('Bar!');
  });

  it('should add content', function() {
    var modal = UI.Modal.create();
    var textContent = 'Foo!';
    var nodeContent = $('<strong>Bar!</strong>');

    modal.addContent(textContent);
    modal.addContent(nodeContent);

    expect(modal.getElement()).toHaveContent(textContent);
    expect(modal.getElement()).toContainChildNode(nodeContent[0]);
  });

  it('should be removed from container on close', function() {
    var mockContainer = $('<container>');
    var modal = UI.Modal.create();
    modal.getElement().appendTo(mockContainer);
    modal.close();
    expect(mockContainer.children().length).toEqual(0);
  });
});
