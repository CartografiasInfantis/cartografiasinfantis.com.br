describe('UI.Modal', function() {
  var UI = CartografiasInfantis.UI;

  it('should be added to the DOM', function() {
    var modal = new UI.Modal;

    expect($('body').children().last()[0]).toEqual(modal.getElement()[0]);
  });

  it('should be added to the passed container', function() {
    var mockContainer = $('<container>');
    var modal = new UI.Modal({container: mockContainer});

    expect(mockContainer).toContainChildNode(modal.getElement()[0]);
  });

  it('should open', function() {
    var modal = new UI.Modal;
    expect(modal.getElement()).notToBeVisible();
    modal.open();
    expect(modal.getElement()).toBeVisible();
  });

  it('should add content', function() {
    var modal = new UI.Modal;
    var textContent = 'Foo!';
    var nodeContent = $('<strong>Bar!</strong>');

    modal.addContent(textContent);
    modal.addContent(nodeContent);

    expect(modal.getElement()).toHaveContent(textContent);
    expect(modal.getElement()).toContainChildNode(nodeContent[0]);
  });

  it('should close', function() {
    var modal = new UI.Modal;
    modal.open();
    modal.close();
    expect(modal.getElement()).notToBeVisible();
  });
});
