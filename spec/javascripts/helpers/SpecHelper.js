beforeEach(function() {
  this.addMatchers({
    toBeVisible: function() {
      var element = $(this.actual);

      return element.css('display') != 'none';
    },
    notToBeVisible: function() {
      var element = $(this.actual);
      
      return element.css('display') == 'none';
    },
    toHaveContent: function(content) {
      var element = $(this.actual);

      return element.text() == content;
    }
  });
});
