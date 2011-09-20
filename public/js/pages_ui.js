var overlay    = $('.overlay')
  , mainContent = $('#content');

$('.page').addClass('hidden');
overlay.bind('click', closeModal);
$('body').delegate('a.close', 'click', closeModal);

$('nav.main').find('a').bind('click', function() {
  var id = this.href.toString().replace(/^.+#/, '');
  var page = $.id(id);
  mainContent.children().addClass('hidden');
  $({})
    .and(overlay)
    .and(mainContent)
    .and(page).removeClass('hidden');
});

function closeModal() {
  $({})
    .and(overlay)
    .and(mainContent)
    .and(mainContent.children())
    .addClass('hidden'); 
}

function showContent() {
  $({})
    .and(overlay)
    .and(mainContent).removeClass('hidden');
}


