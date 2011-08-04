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
    },
    toContainChildNode: function(node) {
      var element = $(this.actual);
      var childNodes = element.children();

      for (var i = childNodes.length; --i >= 0;) {
        if (childNodes[i] === node) {
          return true;
        }
      }

      return false;
    }
  });
});
