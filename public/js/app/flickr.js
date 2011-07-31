var Flickr = {};

Flickr.API = {
  flickr: {
    photosets: {
      getList: function(options) {
        options.method = 'flickr.photosets.getList';
        return new Flickr.Service.Query(options);
      }
    }
  }
};

Flickr.Service = {};

Flickr.Service.URI = "http://api.flickr.com/services/rest/";

Flickr.Service.Query = function(options) {
  this.options = options;
  this.options.format = options.format || 'json';

  this.generateCallback();

  reqwest({
    url: this.url() + '&callback=?',
    type: 'jsonp',
    success: function() {}
  });
}

Flickr.Service.Query.prototype.url = function() {
  var query = [];

  for (var p in this.options)
    query.push([p, this.options[p]].join('='));

  return [Flickr.Service.URI, query.join('&')].join('?');
}


Flickr.Service.Query.prototype.generateCallback = function() {
  var self = this
    , callback = this.options.callback || function() {}
    , callbackKey = 'flickr' + Math.round(Math.random() * 9999)
    , callbackWrapper = function() { 
        delete window[callbackKey];
        callback.apply(self, arguments);
      };

  window[callbackKey] = callbackWrapper;
  this.options.jsoncallback = callbackKey;
  delete this.options.callback;
}

Flickr.Image = {};
Flickr.Image.getURL = function(photoData, size) {
  var url = "http://farm{farm-id}.static.flickr.com/{server-id}/{id}_{secret}{size}.jpg";

  return url
    .replace('{farm-id}', photoData.farm)
    .replace('{server-id}', photoData.server)
    .replace('{id}', photoData.id)
    .replace('{secret}', photoData.secret)
    .replace('{size}', size ? '_' + size : '');
}

Flickr.Image.Sizes = {
  SMALLEST: 's',
  THUMBNAIL: 't',
  SMALL: 'm',
  DEFAULT: '',
  MEDIUM: 'z',
  LARGE: 'b',
  ORIGINAL: 'o'
};

