'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');

  window.map = {
    init: function () {
      window.backend.load(successHandler, errorHandler);
      window.form.activate();
    },
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

  document.addEventListener('keydown', documentKeydownHandler);
  mapPinMain.addEventListener('mousedown', mapPinMainMouseDownHandler);
  mapPinMain.addEventListener('keydown', mapPinMainKeydownHandler);

  function documentKeydownHandler(evt) {
    if (evt.key === ESC_KEY) {
      window.card.remove();
    }
  }

  function mapPinMainMouseDownHandler(evt) {
    if (evt.button === 0) {
      mapPinMain.removeEventListener('mousedown', mapPinMainMouseDownHandler);
    }
  }

  function mapPinMainKeydownHandler(evt) {
    var ENTER_KEY = 'Enter';
    if (evt.key === ENTER_KEY) {
      mapPinMain.removeEventListener('keydown', mapPinMainKeydownHandler);
    }
  }
  var successHandler = function (data) {
    window.filter.activate(data);
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
})();
