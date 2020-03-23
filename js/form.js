'use strict';

(function () {
  var MAIN_PIN_WIDTH = 62;
  var MAIN_PIN_HEIGHT = 84;
  var MIN_X = 0;
  var MAX_X = 1200;
  var MIN_Y = 130;
  var MAX_Y = 630;
  var MAIN_PIN_LEFT = 570;
  var MAIN_PIN_TOP = 375;
  var MAIN_START_PIN_WIDTH = 65;
  var MAIN_START_PIN_HEIGHT = 65;
  var FLAT_MIN_PRICE = 1000;
  var BUNGALO_MIN_PRICE = 0;
  var HOUSE_MIN_PRICE = 5000;
  var PALACE_MIN_PRICE = 10000;
  var ROOM_1 = '1';
  var ROOMS_2 = '2';
  var ROOMS_3 = '3';
  var ROOMS_0 = '100';
  var formNotice = document.querySelector('.ad-form');
  var pinMain = document.querySelector('.map__pin--main');
  var resetButton = formNotice.querySelector('.ad-form__reset');
  var titleInput = document.querySelector('#title');
  var pricePerNightInput = document.querySelector('#price');
  var selectOffer = document.querySelector('#type');
  var selectTimein = document.querySelector('#timein');
  var selectTimeout = document.querySelector('#timeout');
  var selectRooms = document.querySelector('#room_number');
  var selectGuests = document.querySelector('#capacity');
  var avatar = document.querySelector('.ad-form-header__preview img');
  var photo = document.querySelector('.ad-form__photo');
  var optionsGuests = selectGuests.options;

  window.form = {
    deactivate: function () {
      disableForm();
      formNotice.classList.add('ad-form--disabled');
    },
    activate: function () {
      enableForm();
      startSelectGuestsCount();
      formNotice.classList.remove('ad-form--disabled');
    },
    reset: function () {
      setMinPrice();
      resetAllImg();
      resetForm();
      setStartCenterPosition();
    },
    setAddress: function () {
      var addressInput = document.querySelector('#address');
      var positionPin = getCenterPositionPin(pinMain);
      addressInput.value = positionPin;
    }
  };

  disableForm();
  setStartCenterPosition();

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

  function resetAvatar() {
    avatar.src = 'img/muffin-grey.svg';
  }

  function resetPhotos() {
    if (photo.children) {
      photo.innerHTML = '';
    }
  }

  function resetForm() {
    formNotice.reset();
  }

  function disableForm() {
    var elems = formNotice.querySelectorAll('input, select, button, textarea');
    elems.forEach(function (item) {
      item.disabled = true;
    });
  }

  function enableForm() {
    var elems = formNotice.querySelectorAll('input, select, button, textarea');
    elems.forEach(function (item) {
      item.disabled = false;
    });
  }

  function resetAllImg() {
    resetAvatar();
    resetPhotos();
  }


  function selectOfferOption(value) {
    switch (value) {
      case 'flat':
        return FLAT_MIN_PRICE;
      case 'bungalo':
        return BUNGALO_MIN_PRICE;
      case 'house':
        return HOUSE_MIN_PRICE;
      case 'palace':
        return PALACE_MIN_PRICE;
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

  function setMinPrice() {
    var priceInput = document.querySelector('#price');
    priceInput.setAttribute('min', FLAT_MIN_PRICE);
    priceInput.setAttribute('placeholder', FLAT_MIN_PRICE);
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

  function startSelectGuestsCount() {
    selectGuests.value = 1;
    selectGuests.options[0].disabled = true;
    selectGuests.options[1].disabled = true;
    selectGuests.options[3].disabled = true;
  }

  function selectRoomsChangeHandler(evt) {
    var currentValue = evt.target.value;
    disableSelectGuests();
    if (currentValue === ROOMS_3) {
      selectGuests.options[0].disabled = false;
      selectGuests.options[1].disabled = false;
      selectGuests.options[2].disabled = false;
      selectGuestsCount();
    } else if (currentValue === ROOMS_2) {
      selectGuests.options[1].disabled = false;
      selectGuests.options[2].disabled = false;
      selectGuestsCount();
    } else if (currentValue === ROOM_1) {
      selectGuests.options[2].disabled = false;
      selectGuestsCount();
    } else if (currentValue === ROOMS_0) {
      selectGuests.options[3].disabled = false;
      selectGuestsCount();
    }
  }

  function getCenterPositionPin(elem) {
    var centerPinX = Math.floor(elem.offsetLeft + MAIN_PIN_WIDTH / 2);
    var centerPinY = Math.floor(elem.offsetTop + MAIN_PIN_HEIGHT);
    if (centerPinY < MIN_Y) {
      pinMain.style.top = (MIN_Y - MAIN_PIN_HEIGHT) + 'px';
      centerPinY = MIN_Y;
    } else if (centerPinY > MAX_Y) {
      pinMain.style.top = (MAX_Y - MAIN_PIN_HEIGHT) + 'px';
      centerPinY = MAX_Y;
    }
    if (centerPinX < MIN_X) {
      pinMain.style.left = (MIN_X - MAIN_PIN_WIDTH / 2) + 'px';
      centerPinX = MIN_X;
    } else if (centerPinX > MAX_X) {
      pinMain.style.left = (MAX_X - MAIN_PIN_WIDTH / 2) + 'px';
      centerPinX = MAX_X;
    }
    return centerPinX + ', ' + centerPinY;
  }

  function setStartCenterPosition() {
    var addressInput = document.querySelector('#address');
    var positionPin = getStartCenterPosition(pinMain);
    addressInput.value = positionPin;
    pinMain.style.left = MAIN_PIN_LEFT + 'px';
    pinMain.style.top = MAIN_PIN_TOP + 'px';
  }

  function getStartCenterPosition(elem) {
    var centerPinX = Math.floor(elem.offsetLeft + MAIN_START_PIN_WIDTH / 2);
    var centerPinY = Math.floor(elem.offsetTop + MAIN_START_PIN_HEIGHT / 2);
    return centerPinX + ', ' + centerPinY;
  }

})();
