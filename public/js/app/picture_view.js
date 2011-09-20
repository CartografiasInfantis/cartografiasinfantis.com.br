var PictureView = function() {
  this.selectors = {};
}

PictureView.prototype.render = function(data) {
  this.title().text(data.picture.title);
}

PictureView.prototype.title = function() {
  return this.element.find(this.selectors.title);
}
