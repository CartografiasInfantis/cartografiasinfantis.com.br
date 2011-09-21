var PictureView = function() {
  this.selectors = {};
  this.element = null;
}

PictureView.prototype.render = function(data) {
  var image = $('<img>').attr('src', Flickr.Image.getURL(data.picture));
  this.title().text(data.picture.title);
  this.element.find(this.selectors.imageContainer).append(image);
}

PictureView.prototype.title = function() {
  return this.element.find(this.selectors.title);
}

PictureView.prototype.image = function() {
  return this.element.find(this.selectors.imageContainer).find('img');
}
