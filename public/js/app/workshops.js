var CartografiasInfantis = window.CartografiasInfantis || {};
var Workshops = CartografiasInfantis.Workshops = {};

Workshops.Workshop = function(props) {
  this.place = props.place;
  this.flickrID = props.flickrID;
}

Workshops.FlickrPhotosetDataSource = function() {
}

Workshops.FlickrPhotosetDataSource.prototype = new CartografiasInfantis.Broadcaster;

Workshops.FlickrPhotosetDataSource.prototype.getWorkshopData = function(requestOptions) {
  var api = 'http://api.flickr.com/services/rest/?'
    , params = []
    , self = this;
  
  requestOptions.method  = "flickr.photosets.getList";
  requestOptions.api_key = "3dda8ad6d90dab6ffa383686fb99e60d";
  requestOptions.format  = "json";
 
  for (var i in requestOptions) {
    params.push(i + "=" + requestOptions[i]);
  }

  reqwest({
    url: api + params.join('&') + '&callback=?',
    type: 'jsonp',
    success: function(data) {
      self.broadcast('workshop:generated', [self.generateWorkshops(data)]);
    }
  });
}

Workshops.FlickrPhotosetDataSource.prototype.generateWorkshops = function(data) {
  var collection = []
    , photoset;

  for (var i in data.photosets.photoset) {
    photoset = data.photosets.photoset[i];
    collection.push(new Workshops.Workshop({
      place: photoset.title._content.replace(/OFICINA: /, ''),
      flickrID: photoset.id
    }));
  }

  return collection;
}

