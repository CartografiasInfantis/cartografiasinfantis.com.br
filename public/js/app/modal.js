var CartografiasInfantis = window.CartografiasInfantis || {};
CartografiasInfantis.UI = CartografiasInfantis.UI || {};

var UI = CartografiasInfantis.UI;


UI.Modal = function() {
  var element = $(document.createElement('div')).hide();
  this.getElement = function() {
    return element;
  }
}

UI.Modal.prototype = new CartografiasInfantis.Broadcaster;

UI.Modal.prototype.open = function() {
  this.getElement().show();
}

UI.Modal.prototype.setContent = function(content) {
  this.getElement().html(content);
}
