var CartografiasInfantis = window.CartografiasInfantis || {};
CartografiasInfantis.UI = CartografiasInfantis.UI || {};

var UI = CartografiasInfantis.UI;


UI.Modal = function() {};

UI.Modal.prototype = new CartografiasInfantis.Broadcaster;

UI.Modal.create = function(opts) {
  var modal = Object.create(UI.Modal.prototype);
  var opts = opts || {};

  var container = opts.container || 'body';
  var element = $('<div class="ui-modal">').hide();
  element.appendTo(container);

  modal.getElement = function() {
    return element;
  };

  return modal;
};

UI.Modal.prototype.getElement = function() {}

UI.Modal.prototype.open = function() {
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
    title = $('<h1>');
    element.prepend(title);
  }
  return title;
}

UI.Modal.prototype.close = function() {
  this.getElement().hide();
}
