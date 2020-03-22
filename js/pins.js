'use strict';

(function () {
  var mapPins = document.querySelector('.map__pins');
  var pinMain = document.querySelector('.map__pin--main');
  var fragment = document.createDocumentFragment();

  window.pins = {
    create: function (array) {
      window.map.show();
      array.forEach(function (card) {
        var template = window.pin.render(card);
        fragment.appendChild(template);
      });
      mapPins.appendChild(fragment);
    },
    remove: function () {
      var selectPins = mapPins.querySelectorAll('.map__pin');
      selectPins.forEach(function (elem) {
        if (!elem.contains(pinMain)) {
          elem.remove();
        }
      });
    }
  };
})();
