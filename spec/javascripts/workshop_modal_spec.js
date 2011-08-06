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
});
