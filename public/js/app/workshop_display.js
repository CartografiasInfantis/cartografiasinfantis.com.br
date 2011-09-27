var closeBtn = '<a href="#" class="close">x</a>';
var picView = new PictureView();
picView.element = $('.picture');
picView.selectors.title = 'legend';
picView.selectors.imageContainer = 'span';
picView.element.find('.close').bind('click', function() {
});

function showWorkshop(workshop) {
  new Flickr.Service.Query({
    method: 'flickr.photosets.getPhotos',
    api_key: 'a8d2fcbfe9a664321258d29ea6bacb6d',
    photoset_id: workshop.photoset,
    callback: function(data) {
      var modal = UI.WorkshopModal.create()
        , list  = $('<div class="images">');

      showContent();

      modal.container = mainContent;
      modal.setTitle(workshop.name);
      $(closeBtn).insertAfter(modal.getTitle());
      modal.open();

      for (var p in data.photoset.photo) {
        (function(picture) {
          var pic = UI.WorkshopModal.renderPicture(picture);
          pic
            .attr('class', ((p + 1) % 3 < 1) ? 'last' : '')
            .bind('click', function(){
              picView.render({picture: picture});
              closeModal();
              showContent();
              picView.show();
            });
          list.append(pic); // yes, this is horrible...
        })(data.photoset.photo[p]);
      }

      modal.addContent(list);
    }
  });
};
