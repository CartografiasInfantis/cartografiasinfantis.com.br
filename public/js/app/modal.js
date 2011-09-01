var CartografiasInfantis = window.CartografiasInfantis || {};
CartografiasInfantis.UI = CartografiasInfantis.UI || {};

var UI = CartografiasInfantis.UI;


UI.Modal = function() {
  var element = $('<div class="ui-modal">');
  this.getElement = function() {
    return element;
  };
};

UI.Modal.prototype = new CartografiasInfantis.Broadcaster;

UI.Modal.create = function(opts) {
  var modal = new this();

  return modal;
};

UI.Modal.prototype.getElement = function() {}

UI.Modal.prototype.open = function() {
  this.getElement().appendTo(this.container || 'body');
  this.getElement().show();
}

UI.Modal.prototype.addContent = function(content) {
  this.getElement().append(content);
}

UI.Modal.prototype.setTitle = function(text) {
  this.getTitle().text(text);
}

UI.Modal.prototype.getTitle = function() {
  var element = this.getElement();
  var title = element.find('h1');
  if (title.length == 0)  {
    title = $('<h1 class="h1">');
    element.prepend(title);
  }
  return title;
}

UI.Modal.prototype.close = function() {
  this.getElement().remove();
}
