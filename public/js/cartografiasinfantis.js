var map = {
  apiLoaded: function(api) {
    var places = [
          {name: 'Hospital Psiquiátrico Santo Antônio',
           photoset: '72157627270378070',
           coordinates: api.getCoordinates('-30.0614453', '-51.18925949999999')},
          {name: 'Parque da Redenção',
           photoset: '72157627270126984',
           coordinates: api.getCoordinates('-30.0370822', '-51.21541760000002')},
          {name: 'Parque Moinhos de Vento, Parcão',
           photoset: '72157627029526435',
           coordinates: api.getCoordinates('-30.0271796', '-51.20103')},
          {name: 'Estação de Tratamento de Água, DMAE',
           photoset: '72157627270144404',
           coordinates: api.getCoordinates('-30.0275931', '-51.2048762')},
          {name: 'Cais do Porto',
           photoset: '72157627146275459',
           coordinates: api.getCoordinates('-30.0175', '-51.22833330000003')}
        ]
      , center = places[Math.round(Math.random() * (places.length - 1))]

    var controller = new CartografiasInfantis.Places.PlacesController()
      , map        = document.getElementById('map')
      , canvas     = new CartografiasInfantis.Map.MapCanvas(map)

    for (var i in places) {
      (function(workshop) {
        
        var marker = new CartografiasInfantis.Map.Marker(workshop);

        marker.registerObserver(
          function() {
            new Flickr.Service.Query({
              method: 'flickr.photosets.getPhotos',
              api_key: 'a8d2fcbfe9a664321258d29ea6bacb6d',
              photoset_id: workshop.photoset,
              callback: function(data) {
                var modal = $('.workshop')
                  , list  = modal.find('.images');

                $('.overlay').removeClass('hidden');
                modal.find('h1').text(workshop.name);
                modal.removeClass('hidden');

                list.empty();
                list.append((function(pictures){
                  var images = [], imgurl
                    , figclass;

                  for (var p in pictures) {
                    imgurl = Flickr.Image.getURL(pictures[p]);
                    figclass = p % 3 < 1 ? 'last' : '';

                    images.push("<figure class=\"" + figclass + "\"><a href=\"#\"><img src=\"" + imgurl + "\" /></a></figure>");
                  }

                  return images.join('');
                })(data.photoset.photo));
              }
            });
          }, 'marker:click');
        
        canvas.addMarker(marker);

      })(places[i]);
    }

    canvas.centerIn(center.coordinates);
  }
};

CartografiasInfantis.Map.ApiLoader.initialize(map);
CartografiasInfantis.Map.ApiLoader.loadApi();



