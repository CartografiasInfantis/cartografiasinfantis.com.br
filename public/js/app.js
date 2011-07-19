var App = {};

App.loadScript = function(src) {
  var script = document.createElement("script");

  script.type = "text/javascript";
  script.src  = src;
  document.body.appendChild(script);
}
