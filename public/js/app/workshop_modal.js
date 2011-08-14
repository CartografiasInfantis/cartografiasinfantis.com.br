var CartografiasInfantis = window.CartografiasInfantis || {};
CartografiasInfantis.UI = CartografiasInfantis.UI || {};

var UI = CartografiasInfantis.UI;


UI.WorkshopModal = function() {
  var element = $('<div class="workshop ui-modal">');
  this.getElement = function() {
    return element;
  }
}

UI.WorkshopModal.prototype = new UI.Modal;

UI.WorkshopModal.renderPicture = function(picture) {
  var src = Flickr.Image.getURL(picture);
  return $('<figure><a><img src="' + src + '"></a></figure>');
}
