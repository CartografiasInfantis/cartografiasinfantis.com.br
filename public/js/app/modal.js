var CartografiasInfantis = window.CartografiasInfantis || {};
CartografiasInfantis.UI = CartografiasInfantis.UI || {};

var UI = CartografiasInfantis.UI;


UI.Modal = function(opts) {
  var opts = opts || {};

  var container = opts.container || 'body';
  var element = $('<div class="ui-modal">').hide();
  element.appendTo(container);

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

UI.Modal.prototype.close = function() {
  this.getElement().hide();
}
