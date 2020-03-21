'use strict';

(function () {
  var mapPins = document.querySelector('.map__pins');
  var pinMain = document.querySelector('.map__pin--main');
  var fragment = document.createDocumentFragment();
  var PIN_AMOUNT = 5;
  var typeHouse;

  window.pins = {
    actualPins: [],
    create: function (array) {
      window.map.show();
      var fiveActualPins = array.slice(0, PIN_AMOUNT);
      fiveActualPins.forEach(function (card) {
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
    },
    update: function () {
      this.remove();
      window.card.remove();
      var filtredPins = this.actualPins.filter(function (actualPin) {
        return actualPin.offer.type === typeHouse;
      });
      window.pins.create(filtredPins);
    }
  };

  var successHandler = function (data) {
    window.pins.actualPins = data;
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

  window.form.onTypeChange = function (value) {
    typeHouse = value;
    window.pins.update();
  };

  window.backend.load(successHandler, errorHandler);
})();
