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

UI.WorkshopModal.prototype.setTitle = function(title) {
  var tag = this.getElement().find('h1');
  if (tag.length == 0) {
    tag = $('<h1 class="h1">');
    this.getElement().prepend(tag);
  }
  tag.text(title);
}
