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

  window.form = {
    deactivate: function () {
      disableAllForms();
      formNotice.classList.add('ad-form--disabled');
    },
    activate: function () {
      enableAllForms();
      window.pins.create(window.pins.actualPins);
      formNotice.classList.remove('ad-form--disabled');
    },
    reset: function () {
      resetAllForm();
    },
    onTypeChange: function () {},
    onPriceChange: function () {},
    onRoomsChange: function () {},
    onGuestsChange: function () {},
    onFeaturesChange: function () {}
  };

  disableAllForms();
  window.setAddressInputValue();

  resetButton.addEventListener('click', function () {
    window.map.reset();
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
  formMap.addEventListener('change', formMapChangeHandler);

  function resetForm(elem) {
    elem.reset();
  }

  function disableForm(elem) {
    var elems = elem.querySelectorAll('input, select, button, textarea');
    elems.forEach(function (item) {
      item.disabled = true;
    });
  }

  function enableForm(elem) {
    var elems = elem.querySelectorAll('input, select, button, textarea');
    elems.forEach(function (item) {
      item.disabled = false;
    });
  }

  function resetAllForm() {
    resetForm(formNotice);
    resetForm(formMap);
  }

  function disableAllForms() {
    disableForm(formNotice);
    disableForm(formMap);
  }

  function enableAllForms() {
    enableForm(formNotice);
    enableForm(formMap);
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

  function formMapChangeHandler(evt) {
    if (evt.target.closest('#housing-type')) {
      window.form.onTypeChange(evt.target.value);
    } else if (evt.target.closest('#housing-price')) {
      window.form.onPriceChange(evt.target.value);
    } else if (evt.target.closest('#housing-rooms')) {
      window.form.onRoomsChange(evt.target.value);
    } else if (evt.target.closest('#housing-guests')) {
      window.form.onFeaturesChange(evt.target.value);
    }
    window.pins.update();
  }

})();
