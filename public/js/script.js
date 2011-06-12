$(function(){
  $('.expand').live("click", function(){
    $(this).parents("figure").find(".details").slideToggle(600);
    $(this).text($(this).text() == 'Mais informações' ? 'Menos informações' : 'Mais informações');
    });
});
