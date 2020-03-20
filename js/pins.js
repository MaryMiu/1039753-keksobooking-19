'use strict';

(function () {
  var PIN_AMOUNT = 8;
  var mapPins = document.querySelector('.map__pins');
  var pinMain = document.querySelector('.map__pin--main');
  var fragment = document.createDocumentFragment();

  window.pins = {
    create: function () {
      window.map.show();

      for (var i = 0; i < PIN_AMOUNT; i++) {
        var pin = window.pin.create(i);
        window.card.data.push(pin);
      }

      window.card.data.forEach(function (card) {
        var template = window.pin.render(card);
        fragment.appendChild(template);
      });

      mapPins.appendChild(fragment);
    },
    remove: function () {
      var selectPins = mapPins.querySelectorAll('.map__pin');
      for (var i = 0; i < selectPins.length; i++) {
        var element = selectPins[i];
        if (!element.contains(pinMain)) {
          element.remove();
        }
      }
    }
  };
})();
