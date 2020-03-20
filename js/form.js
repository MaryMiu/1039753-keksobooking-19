'use strict';

(function () {
  var formNotice = document.querySelector('.ad-form');
  var formMap = document.querySelector('.map__filters');
  var pinMain = document.querySelector('.map__pin--main');
  var resetButton = formNotice.querySelector('.ad-form__reset');
  var titleInput = document.querySelector('#title');
  var pricePerNightInput = document.querySelector('#price');
  var selectOffer = document.querySelector('#type');
  var selectTimein = document.querySelector('#timein');
  var selectTimeout = document.querySelector('#timeout');
  var selectRooms = document.querySelector('#room_number');
  var selectGuests = document.querySelector('#capacity');
  var optionsGuests = selectGuests.options;

  window.setAddressInputValue = function () {
    var addressInput = document.querySelector('#address');
    var centerPositionPin = getCenterPositionPin(pinMain);
    addressInput.value = centerPositionPin;
  };

  disableAllForms();
  window.setAddressInputValue();

  pinMain.addEventListener('mousedown', pinMouseDownHandler);
  pinMain.addEventListener('keydown', pinKeydownHandler);

  resetButton.addEventListener('click', function () {
    deactivate();
    window.pins.remove();
    window.map.hide();
    pinMain.addEventListener('mousedown', pinMouseDownHandler);
    pinMain.addEventListener('keydown', pinKeydownHandler);
    formMap.reset();
  });

  titleInput.addEventListener('invalid', function () {
    if (titleInput.validity.tooShort) {
      titleInput.setCustomValidity('Описание должно состоять минимум из 30-ти символов');
    } else if (titleInput.validity.tooLong) {
      titleInput.setCustomValidity('Описание не должно превышать 100 символов');
    } else if (titleInput.validity.valueMissing) {
      titleInput.setCustomValidity('Обязательное поле');
    } else {
      titleInput.setCustomValidity('');
    }
  });

  pricePerNightInput.addEventListener('invalid', function () {
    if (pricePerNightInput.validity.rangeUnderflow) {
      var minPricePerNightInput = pricePerNightInput.getAttribute('min');
      pricePerNightInput.setCustomValidity('Цена за ночь не может быть менее ' + minPricePerNightInput + ' руб.');
    } else if (pricePerNightInput.validity.rangeOverflow) {
      pricePerNightInput.setCustomValidity('Цена за ночь не должна превышать 1 000 000 руб.');
    } else if (pricePerNightInput.validity.valueMissing) {
      pricePerNightInput.setCustomValidity('Обязательное поле');
    } else {
      pricePerNightInput.setCustomValidity('');
    }
  });

  selectOffer.addEventListener('change', selectOfferChangeHandler);
  selectTimein.addEventListener('change', selectTimeChangeHandler);
  selectTimeout.addEventListener('change', selectTimeChangeHandler);
  selectRooms.addEventListener('change', selectRoomsChangeHandler);

  function disableForm(form) {
    var elems = form.querySelectorAll('input, select');
    elems.forEach(function (item) {
      item.disabled = true;
    });
  }

  function enableForm(form) {
    var elems = form.querySelectorAll('input, select');
    elems.forEach(function (item) {
      item.disabled = false;
    });
  }

  function disableAllForms() {
    disableForm(formNotice);
    disableForm(formMap);
  }

  function enableAllForms() {
    enableForm(formNotice);
    enableForm(formMap);
  }

  function deactivate() {
    disableAllForms();
    formNotice.classList.add('ad-form--disabled');
  }

  function activate() {
    window.pins.create();
    enableAllForms();
    formNotice.classList.remove('ad-form--disabled');
  }

  function pinMouseDownHandler(evt) {
    if (evt.button === 0) {
      activate();
      pinMain.removeEventListener('mousedown', pinMouseDownHandler);
    }
  }

  function pinKeydownHandler(evt) {
    var ENTER_KEY = 'Enter';
    if (evt.key === ENTER_KEY) {
      activate();
      pinMain.removeEventListener('keydown', pinKeydownHandler);
    }
  }

  function selectOfferOption(value) {
    switch (value) {
      case 'flat':
        return 1000;
      case 'bungalo':
        return 0;
      case 'house':
        return 5000;
      case 'palace':
        return 10000;
      default:
        throw new Error('Нет таких значений');
    }
  }

  function selectOfferChangeHandler(evt) {
    var priceInput = document.querySelector('#price');
    var currentValue = evt.target.value;
    var minPrice = selectOfferOption(currentValue);
    priceInput.setAttribute('min', minPrice);
    priceInput.setAttribute('placeholder', minPrice);
  }

  function selectTimeChangeHandler(evt) {
    var currentIndex = evt.target.options.selectedIndex;
    if (evt.target === selectTimein) {
      selectTimeout.options[currentIndex].selected = true;
    } else {
      selectTimein.options[currentIndex].selected = true;
    }
  }

  function disableSelectGuests() {
    for (var i = 0; i < optionsGuests.length; i++) {
      optionsGuests[i].disabled = true;
    }
  }

  function selectGuestsCount() {
    for (var i = 0; i < optionsGuests.length; i++) {
      if (!optionsGuests[i].disabled) {
        optionsGuests[i].selected = true;
        return;
      }
    }
  }

  function selectRoomsChangeHandler(evt) {
    var currentValue = evt.target.value;
    disableSelectGuests();
    switch (currentValue) {
      case '3':
        selectGuests.options[0].disabled = false;
        break;
      case '2':
        selectGuests.options[1].disabled = false;
        break;
      case '1':
        selectGuests.options[2].disabled = false;
        selectGuestsCount();
        break;
      case '100':
        selectGuests.options[3].disabled = false;
        selectGuestsCount();
        break;
      default:
        break;
    }
  }

  function getCenterPositionPin(elem) {
    var MAIN_PIN_WIDTH = 62;
    var MAIN_PIN_HEIGHT = 84;
    var centerPinX = elem.offsetLeft + MAIN_PIN_WIDTH / 2;
    var centerPinY = elem.offsetTop + MAIN_PIN_HEIGHT;
    return centerPinX + ', ' + centerPinY;
  }
})();
