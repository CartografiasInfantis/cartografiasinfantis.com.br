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
      var match = new RegExp(content).test(element.text());

      this.message = function() {
        if (!match) {
          return 'Expected "' + content +  '" but had "' + element.text() + '"';  
        } 
      };
      return match;
    },
    notToHaveContent: function(content) {
      var element = this.actual;
      var match = !(new RegExp(content).test(element.text()));

      return match;
    },
    toContainChildNode: function(node) {
      var element = $(this.actual);
      var childNodes = element.children();

      if (node.tagName) {
        for (var i = childNodes.length; --i >= 0;) {
          if (childNodes[i] === node) {
            return true;
          }
        }
      } else {
        return element.find(node).length > 0;
      }

      return false;
    }
  });
});
