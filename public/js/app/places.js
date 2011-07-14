var CartografiasInfantis = window.CartografiasInfantis || {};
CartografiasInfantis.Controllers = CartografiasInfantis.Controllers || {};
CartografiasInfantis.Controllers.PlacesController = PlacesController;

function PlacesController(collection) {
  this.collection = collection;
}

PlacesController.prototype = {
  select: function(id) {
    if (this.selectedID != undefined) {
      this.collection[this.selectedID].selected = false;
    }
    this.collection[id].selected = true;
    this.selectedID              = id;

    this.broadcast('placeSelected', {
        selectedID: this.selectedID
      , places: this.collection
    });
  },
  broadcast: function(event, args) {
    bean.fire(this, event, [args]);
  },
  registerObserver: function(observer, event) {
    var handlers = {};
    handlers[event] = function() {
      return observer[event].apply(observer, arguments);
    }
    handlers[event].toString = observer[event].toString;
    bean.add(this, handlers);
  }
}


