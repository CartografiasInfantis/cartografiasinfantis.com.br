describe('Picture View', function() {
  var subject, picture;

  beforeEach(function() {
    subject = new PictureView();
    subject.selectors.title = 'p';
    subject.element = $("<div>\
        <span></span>\
        <p></p>\
      </div>"
    );
    picture = {"id":"5892885064", "secret":"0ca7d76920", "server":"5317", "farm":6, "title":"Cow parade", "isprimary":"1"};
  });

  it('should render image title', function() {
    subject.render({picture: picture});
    expect(subject.title().text()).toEqual('Cow parade');
  });

  it('should render image', function() {
    subject.render({picture: picture});
  });
});
