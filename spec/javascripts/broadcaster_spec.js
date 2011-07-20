describe('Broadcaster', function() {
  var Broadcaster = CartografiasInfantis.Broadcaster
    , subject = new Broadcaster();

  it('should notify observers', function() {
    var mockObserver  = jasmine.createSpy('Event observer')
      , foo = 'foo'
      , bar = 'bar';

    subject.registerObserver(mockObserver, 'mockEvent');
    subject.broadcast('mockEvent', [foo, bar]);

    expect(mockObserver).toHaveBeenCalledWith(foo, bar);
  });
});
