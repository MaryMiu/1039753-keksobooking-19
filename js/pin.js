'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  window.pin = {
    render: function (elem) {
      var pinCloneTemplate = pinTemplate.cloneNode(true);
      pinCloneTemplate.style.left = calcPinPositionX(elem.location.x) + 'px';
      pinCloneTemplate.style.top = calcPinPositionY(elem.location.y) + 'px';
      pinCloneTemplate.querySelector('img').src = elem.author.avatar;
      pinCloneTemplate.querySelector('img').alt = elem.offer.title;

      function pinClickHandler(evt) {
        var hasCardOnMap = document.querySelector('.map__card');
        if (hasCardOnMap) {
          window.card.remove();
        }
        makeActivePin(evt.currentTarget);
        window.card.render(elem);
      }
      pinCloneTemplate.addEventListener('click', pinClickHandler);

      return pinCloneTemplate;
    }
  };

  function makeActivePin(elem) {
    var mapPins = document.querySelectorAll('.map__pin');
    mapPins.forEach(function (item) {
      item.classList.remove('map__pin--active');
    });
    elem.classList.add('map__pin--active');
  }

  function calcPinPositionX(x) {
    return x - (PIN_WIDTH / 2);
  }

  function calcPinPositionY(y) {
    return y - (PIN_HEIGHT);
  }

})();
