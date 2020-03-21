'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var mapPinMain = document.querySelector('.map__pin--main');

  window.map = {
    show: function () {
      map.classList.remove('map--faded');
    },
    hide: function () {
      map.classList.add('map--faded');
    },
    reset: function () {
      window.pins.remove();
      window.card.remove();
      window.map.hide();
      mapPinMain.addEventListener('mousedown', mapPinMainMouseDownHandler);
      mapPinMain.addEventListener('keydown', mapPinMainKeydownHandler);
      window.form.reset();
      window.form.deactivate();
    }
  };

  mapPins.addEventListener('click', mapPinsClickHandler);
  document.addEventListener('keydown', documentKeydownHandler);
  mapPinMain.addEventListener('mousedown', mapPinMainMouseDownHandler);
  mapPinMain.addEventListener('keydown', mapPinMainKeydownHandler);

  function mapPinsClickHandler(evt) {
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

  function mapPinMainMouseDownHandler(evt) {
    if (evt.button === 0) {
      window.form.activate();
      mapPinMain.removeEventListener('mousedown', mapPinMainMouseDownHandler);
    }
  }

  function mapPinMainKeydownHandler(evt) {
    var ENTER_KEY = 'Enter';
    if (evt.key === ENTER_KEY) {
      window.form.activate();
      mapPinMain.removeEventListener('keydown', mapPinMainKeydownHandler);
    }
  }

})();
