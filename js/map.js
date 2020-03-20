'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';
  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');

  window.map = {
    show: function () {
      map.classList.remove('map--faded');
    },
    hide: function () {
      map.classList.add('map--faded');
    }
  };

  mapPins.addEventListener('click', pinClickHandler);
  document.addEventListener('keydown', documentKeydownHandler);

  function pinClickHandler(evt) {
    var currentPin = evt.target.closest('.map__pin');
    if (evt.target.closest('.map__pin--main')) {
      return;
    }
    if (!currentPin) {
      return;
    }
    var mapPinsArray = Array.from(mapPins.children).slice(2);
    var indexPin = mapPinsArray.indexOf(currentPin);
    window.card.remove();
    window.card.create(indexPin);
    document.addEventListener('keydown', documentKeydownHandler);
  }

  function documentKeydownHandler(evt) {
    if (evt.key === ESC_KEY) {
      window.card.remove();
    }
  }

})();
