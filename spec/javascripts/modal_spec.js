describe('UI.Modal', function() {
  var UI = CartografiasInfantis.UI;

  it('should open', function() {
    var modal = new UI.Modal;
    expect(modal.getElement()).notToBeVisible();
    modal.open();
    expect(modal.getElement()).toBeVisible();
  });

  it('should set content', function() {
    var modal = new UI.Modal;
    modal.setContent('Foo!');
    expect(modal.getElement()).toHaveContent('Foo!');
  });

  it('should close', function() {
    var modal = new UI.Modal;
    modal.open();
    modal.close();
    expect(modal.getElement()).notToBeVisible();
  });
});
