var CartografiasInfantis = window.CartografiasInfantis || {};

CartografiasInfantis.Broadcaster = function() {
}

CartografiasInfantis.Broadcaster.prototype = {
  broadcast: function(event, args) {
    $(this).trigger(event, [args]);
  },
  registerObserver: function(observer, event) {
    var handlers = {};
    handlers[event] = function(args) {
      return observer.apply(window, args);
    }
    handlers[event].toString = observer.toString;
    $(this).bind(handlers);
  }
}


