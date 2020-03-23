'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';
  var map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');
  var isInit = false;

  window.map = {
    init: function () {
      window.backend.load(successHandler, errorHandler);
      window.form.activate();
      window.map.show();
    },
    show: function () {
      map.classList.remove('map--faded');
    },
    hide: function () {
      map.classList.add('map--faded');
    },
    reset: function () {
      isInit = false;
      window.pins.remove();
      window.card.remove();
      window.map.hide();
      mapPinMain.addEventListener('mousedown', mapPinMainMouseDownHandler);
      mapPinMain.addEventListener('keydown', mapPinMainKeydownHandler);
      window.form.reset();
      window.form.deactivate();
      window.filter.deactivate();
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
    if (evt.key === ENTER_KEY) {
      mapPinMain.removeEventListener('keydown', mapPinMainKeydownHandler);
    }
  }

  function successHandler(data) {
    window.filter.activate(data);
  }

  function errorHandler(errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  }

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    function mouseMoveHandler(moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
      mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
      window.form.setAddress();
    }

    function mouseUpHandler(upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    }
    if (!isInit) {
      window.map.init();
      isInit = true;
    }

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });
})();
