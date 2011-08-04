beforeEach(function() {
  this.addMatchers({
    toBeVisible: function() {
      var element = $(this.actual);

      return element.css('display') != 'none';
    },
    notToBeVisible: function() {
      var element = $(this.actual);
      
      return element.css('display') == 'none';
    }
  });
});
