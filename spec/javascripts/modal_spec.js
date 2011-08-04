describe('UI.Modal', function() {
  var UI = CartografiasInfantis.UI;

  it('should open', function() {
    var modal = new UI.Modal;
    expect(modal.getElement()).notToBeVisible();
    modal.open();
    expect(modal.getElement()).toBeVisible();
  });
});
