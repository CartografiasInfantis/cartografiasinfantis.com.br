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
