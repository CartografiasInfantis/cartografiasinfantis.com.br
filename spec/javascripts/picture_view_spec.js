describe('Picture View', function() {
  var subject, picture;

  beforeEach(function() {
    subject = new PictureView();
    subject.selectors.title = 'p';
    subject.selectors.imageContainer = 'span';
    subject.element = $("<div class='hidden'>\
        <span></span>\
        <p></p>\
      </div>"
    );
    picture = {"id":"5892885064", "secret":"0ca7d76920", "server":"5317", "farm":6, "title":"Cow parade", "isprimary":"1"};
    picture2 = {"id":"7887778LOL", "secret":"0ca7d76920", "server":"5317", "farm":6, "title":"Jeremy in Italy", "isprimary":"1"};
  });

  it('should render image title', function() {
    subject.render({picture: picture});
    expect(subject.title().text()).toEqual('Cow parade');
  });

  it('should render image', function() {
    subject.render({picture: picture});
    expect(subject.image().attr('src')).toMatch(picture.id);
  });

  it('should render only one image at time', function() {
    subject.render({picture: picture});
    subject.render({picture: picture2});
    expect(subject.image().attr('src')).not.toMatch(picture.id);
  });

  it('should show up', function() {
    subject.show();
    expect(subject.element.attr('class')).not.toMatch('hidden');
  });
});
