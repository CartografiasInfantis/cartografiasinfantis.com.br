describe('UI.Modal', function() {
  var UI = CartografiasInfantis.UI;

  it('should be added to the DOM', function() {
    var modal = UI.Modal.create();

    expect($('body').children().last()[0]).toEqual(modal.getElement()[0]);
  });

  it('should be added to the passed container', function() {
    var mockContainer = $('<container>');
    var modal = UI.Modal.create({container: mockContainer});

    expect(mockContainer).toContainChildNode(modal.getElement()[0]);
  });

  it('should open', function() {
    var modal = UI.Modal.create();
    expect(modal.getElement()).notToBeVisible();
    modal.open();
    expect(modal.getElement()).toBeVisible();
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

  it('should close', function() {
    var modal = UI.Modal.create();
    modal.open();
    modal.close();
    expect(modal.getElement()).notToBeVisible();
  });
});
