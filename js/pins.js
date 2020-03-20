'use strict';

(function () {
  var actualPins = [];
  var mapPins = document.querySelector('.map__pins');
  var pinMain = document.querySelector('.map__pin--main');
  var fragment = document.createDocumentFragment();

  window.pins = {
    create: function () {
      window.map.show();

      window.card.data = actualPins;
      actualPins.forEach(function (card) {
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

  var successHandler = function (truePins) {
    actualPins = truePins;
    window.pins.create(actualPins);
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(successHandler, errorHandler);
})();
