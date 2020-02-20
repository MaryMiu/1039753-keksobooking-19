'use strict';
var MAP_WIDTH = 1200;
var COORD_X = 130;
var COORD_Y = 630;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var MIN_PRICE = 500;
var MAX_PRICE = 10000;
var MIN_GUESTS = 1;
var MAX_GUESTS = 10;
var MIN_ROOMS = 1;
var MAX_ROOMS = 10;
var PIN_AMOUNT = 8;
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var pins = [];
var pinType = ['palace', 'flat', 'house', 'bungalo'];
var pinFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var mapPins = document.querySelector('.map__pins');
var fragment = document.createDocumentFragment();
var counter = makeCounter();
var map = document.querySelector('.map');


function showMap() {
  map.classList.remove('map--faded');
}

function hideMap() {
  map.classList.add('map--faded');
}

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function fetchRandomItems(arr) {
  return arr[getRandomArbitrary(0, arr.length)];
}

function fetchArrRandomLength(arr) {
  return arr.slice(0, [getRandomArbitrary(1, arr.length + 1)]);
}

function getRandomTitle() {
  return fetchRandomItems(['Квартирка в центре', 'Апартаменты рядом с императорским дворцом',
    'Студия на Такэсита', 'Эко-Апартаменты в Одайба', 'Чистая квартира с красивым видом на Сумиду',
    'Новая квартира, тепло, уютно, 200 этаж', 'Апартаменты над телевизионной башней',
    'Уютная квартира рядом с вокзалом'
  ]);
}

function getRandomDescription() {
  return fetchRandomItems(['Можно разместить 20 человек! Удачное расположение в центре и близость к техника, ' +
    'постельное белье, полотенца. Чистая ванна.Wi-Fi на всей территории. Можно с животными.',
    'Квартира оборудована всем необходимым от постельного белья до современной бытовой техники, а так же имеется ' +
    'безлимитный бесплатный Wi-Fi Интернет. И, извините, мы не говорим по-русски.',
    'Новый дом, современный ремонт, идеальная чистота, безупречное белье, есть все для комфортного проживания.',
    'Уютная, тёплая квартира с шикарным местоположением. Рядом железнодорожный вокзал и станция метро,' +
    ' супермаркеты и парикмахерские.'
  ]);
}

function getRandomTime() {
  return fetchRandomItems(['12:00', '13:00', '14:00']);
}

function getRandomImage() {
  return fetchArrRandomLength(['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']);
}

function calcPinPositionX(x) {
  return x - (PIN_WIDTH / 2);
}

function calcPinPositionY(y) {
  return y - (PIN_HEIGHT);
}

function makeCounter() {
  var currentCount = 1;

  return function () {
    return currentCount++;
  };
}

function getAvatar() {
  var imgCounter = counter();
  if (String(imgCounter).length === 1) {
    imgCounter = '0' + imgCounter;
  }
  return 'img/avatars/user' + imgCounter + '.png';
}

function createPin() {
  var pin = {
    author: {
      avatar: getAvatar()
    },
    offer: {
      title: getRandomTitle(),
      address: function () {
        var addressX = pin.location.x;
        var addressY = pin.location.y;
        return addressX + ', ' + addressY;
      },
      price: getRandomArbitrary(MIN_PRICE, MAX_PRICE),
      type: pinType[getRandomArbitrary(0, pinType.length)],
      rooms: getRandomArbitrary(MIN_ROOMS, MAX_ROOMS),
      guests: getRandomArbitrary(MIN_GUESTS, MAX_GUESTS),
      checkin: getRandomTime(),
      checkout: getRandomTime(),
      features: pinFeatures.slice(0, [getRandomArbitrary(1, pinFeatures.length + 1)]),
      description: getRandomDescription(),
      photos: getRandomImage(),
    },
    location: {
      x: getRandomArbitrary(0, MAP_WIDTH),
      y: getRandomArbitrary(COORD_X, COORD_Y)
    }
  };
  return pin;
}

function renderPin(elem) {
  var pinCloneTemplate = pinTemplate.cloneNode(true);
  pinCloneTemplate.style.left = calcPinPositionX(elem.location.x) + 'px';
  pinCloneTemplate.style.top = calcPinPositionY(elem.location.y) + 'px';
  pinCloneTemplate.querySelector('img').src = elem.author.avatar;
  pinCloneTemplate.querySelector('img').alt = elem.offer.title;
  elem.offer.address();
  fragment.appendChild(pinCloneTemplate);
}

function showPins() {
  showMap();

  for (var i = 0; i < PIN_AMOUNT; i++) {
    var pin = createPin(i);
    pins.push(pin);
  }

  pins.forEach(renderPin);
  mapPins.appendChild(fragment);
}


function selectOfferType(str) {
  switch (str) {
    case 'flat':
      return 'Квартира';
    case 'bungalo':
      return 'Бунгало';
    case 'house':
      return 'Дом';
    case 'palace':
      return 'Дворец';
    default:
      throw new Error('Нет таких значений');
  }
}

function createFeaturesElem(arr) {
  var list = document.createDocumentFragment();
  arr.forEach(function (item) {
    var elem = document.createElement('li');
    elem.className = 'popup__feature popup__feature--' + item;
    list.append(elem);
  });
  return list;
}

function createPhotosElem(arr) {
  var list = document.createDocumentFragment();
  arr.forEach(function (item) {
    var elem = document.createElement('img');
    elem.className = 'popup__photo';
    elem.width = 45;
    elem.height = 40;
    elem.alt = 'Фотография жилья';
    elem.src = item;
    list.append(elem);
  });
  return list;
}

function renderCard(elem) {
  var cardCloneTemplate = cardTemplate.cloneNode(true);
  cardCloneTemplate.querySelector('.popup__title').textContent = elem.offer.title;
  cardCloneTemplate.querySelector('.popup__text--address').textContent = elem.offer.address();
  cardCloneTemplate.querySelector('.popup__text--price').textContent = elem.offer.price + ' ₽/ночь';
  cardCloneTemplate.querySelector('.popup__type').textContent = selectOfferType(elem.offer.type);
  cardCloneTemplate.querySelector('.popup__text--capacity').textContent = elem.offer.rooms + ' комнаты для ' + elem.offer.guests + ' гостей';
  cardCloneTemplate.querySelector('.popup__text--time').textContent = 'Заезд после ' + elem.offer.checkin + ', выезд до ' + elem.offer.checkout;
  cardCloneTemplate.querySelector('.popup__features').innerHTML = '';
  cardCloneTemplate.querySelector('.popup__features').append(createFeaturesElem(elem.offer.features));
  cardCloneTemplate.querySelector('.popup__description').textContent = elem.offer.description;
  cardCloneTemplate.querySelector('.popup__photos').innerHTML = '';
  cardCloneTemplate.querySelector('.popup__photos').append(createPhotosElem(elem.offer.photos));
  cardCloneTemplate.querySelector('.popup__avatar').src = elem.author.avatar;
  fragment.appendChild(cardCloneTemplate);
}

function showCards() {
  renderCard(pins[0]);
  map.appendChild(fragment);
}

// showCards();


var formNotice = document.querySelector('.ad-form');
var formMap = document.querySelector('.map__filters');

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

disableAllForms();

function deactivate() {
  disableAllForms();
  formNotice.classList.add('ad-form--disabled');
}

function activate() {
  showPins();
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

var pinMain = document.querySelector('.map__pin--main');

pinMain.addEventListener('mousedown', pinMouseDownHandler);
pinMain.addEventListener('keydown', pinKeydownHandler);

var resetButton = formNotice.querySelector('.ad-form__reset');

resetButton.addEventListener('click', function () {
  deactivate();
  removePins();
  hideMap();
  pinMain.addEventListener('mousedown', pinMouseDownHandler);
  pinMain.addEventListener('keydown', pinKeydownHandler);
  formMap.reset();
});

function removePins() {
  var selectPins = mapPins.querySelectorAll('.map__pin');
  for (var i = 0; i < selectPins.length; i++) {
    var element = selectPins[i];
    if (!element.contains(pinMain)) {
      element.remove();
    }
  }
}

var titleInput = document.querySelector('#title');

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

var pricePerNightInput = document.querySelector('#price');

pricePerNightInput.addEventListener('invalid', function () {
  if (pricePerNightInput.validity.rangeUnderflow) {
    var minPricePerNightInput = pricePerNightInput.getAttribute("min");
    pricePerNightInput.setCustomValidity('Цена за ночь не может быть менее ' + minPricePerNightInput + ' руб.');
  } else if (pricePerNightInput.validity.rangeOverflow) {
    pricePerNightInput.setCustomValidity('Цена за ночь не должна превышать 1 000 000 руб.');
  } else if (pricePerNightInput.validity.valueMissing) {
    pricePerNightInput.setCustomValidity('Обязательное поле');
  } else {
    pricePerNightInput.setCustomValidity('');
  }
});

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

var selectOffer = document.querySelector('#type');
selectOffer.addEventListener('change', selectOfferChangeHandler);

function selectOfferChangeHandler(evt) {
  var priceInput = document.querySelector('#price');
  var currentValue = evt.target.value;
  var minPrice = selectOfferOption(currentValue);
  priceInput.setAttribute('min', minPrice);
  priceInput.setAttribute('placeholder', minPrice);
}

var selectTimein = document.querySelector('#timein');
var selectTimeout = document.querySelector('#timeout');

function selectTimeChangeHandler(evt) {
  var currentIndex = evt.target.options.selectedIndex;
  if (evt.target === selectTimein) {
    selectTimeout.options[currentIndex].selected = true;
  } else {
    selectTimein.options[currentIndex].selected = true;
  }
}

selectTimein.addEventListener('change', selectTimeChangeHandler);
selectTimeout.addEventListener('change', selectTimeChangeHandler);

var selectRooms = document.querySelector('#room_number');
var selectGuests = document.querySelector('#capacity');
var optionsGuests = selectGuests.options;

function disableSelectGuests() {
  for (var i = 0; i < optionsGuests.length; i++) {
    optionsGuests[i].disabled = true;
  }
}

function selectedSelectGuests() {
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
    case "3":
      selectGuests.options[0].disabled = false;
    case "2":
      selectGuests.options[1].disabled = false;
    case "1":
      selectGuests.options[2].disabled = false;
      selectedSelectGuests();
      break;
    case "100":
      selectGuests.options[3].disabled = false;
      selectedSelectGuests();
      break;
    default:
      throw new Error('Нет таких значений');
  }
}

selectRooms.addEventListener('change', selectRoomsChangeHandler);

function calcCenterPositionPin() {
  var MAIN_PIN_WIDTH = 62;
  var MAIN_PIN_HEIGHT = 84;
  var addressInput = document.querySelector("#address");

  var startCoords = {
    x: pinMain.offsetLeft,
    y: pinMain.offsetTop
  };

  var centerPositionCoords = {
    x: function () {
      return startCoords.x + MAIN_PIN_WIDTH / 2;

    },
    y: function () {
      return startCoords.y + MAIN_PIN_HEIGHT;
    }
  }

  addressInput.value = centerPositionCoords.x() + ', ' + centerPositionCoords.y();
}

calcCenterPositionPin();
