var closeBtn = '<a href="#" class="close">x</a>';

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
        var pic = UI.WorkshopModal.renderPicture(data.photoset.photo[p]);
        pic.attr('class', ((p + 1) % 3 < 1) ? 'last' : '');
        list.append(pic); // yes, this is horrible...
      }

      modal.addContent(list);
    }
  });
};
