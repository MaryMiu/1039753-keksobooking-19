'use strict';
var MAP_WIDTH = 1200;
var CCORD_X = 130;
var COORD_Y = 630;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var MIN_PRICE = 500;
var MAX_PRICE = 10000;
var MIN_GUESTS = 1;
var MAX_GUESTS = 10;
var MIN_ROOMS = 1;
var MAX_ROOMS = 10;
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var pins = [];
var pinType = ['palace', 'flat', 'house', 'bungalo'];
var pinFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var mapPins = document.querySelector('.map__pins');
var fragment = document.createDocumentFragment();


function removeClass(el) {
  document.querySelector(el).classList.remove('map--faded');
}

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function fetchRandomItems(arr) {
  return arr[getRandomArbitrary(0, arr.length)];
}

function getRandomTitle() {
  return fetchRandomItems(['Квартирка в центре', 'Апартаменты рядом с императорским дворцом', 'Студия на Такэсита', 'Эко-Апартаменты в Одайба', 'Чистая квартира с красивым видом на Сумиду', 'Новая квартира, тепло, уютно, 200 этаж', 'Апартаменты над телевизионной башней', 'Уютная квартира рядом с вокзалом']);
}

function getRandomDescription() {
  return fetchRandomItems(['Можно разместить 20 человек! Удачное расположение в центре и близость к техника, постельное белье, полотенца. Чистая ванна.Wi-Fi на всей территории. Можно с животными.', 'Квартира оборудована всем необходимым от постельного белья до современной бытовой техники, а так же имеется безлимитный бесплатный Wi-Fi Интернет. И, извините, мы не говорим по-русски.', 'Новый дом, современный ремонт, идеальная чистота, безупречное белье, есть все для комфортного проживания.', 'Уютная, тёплая квартира с шикарным местоположением. Рядом железнодорожный вокзал и станция метро, супермаркеты и парикмахерские.']);
}

function getRandomTime() {
  return fetchRandomItems(['12:00', '13:00', '14:00']);
}

function getRandomImage() {
  var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  return photos.slice(0, [getRandomArbitrary(1, photos.length + 1)]);
}

function calcPinPositionX(x) {
  return x - (PIN_WIDTH / 2);
}

function calcPinPositionY(y) {
  return y - (PIN_HEIGHT);
}

function createPin(index) {
  var pin = {
    author: {
      avatar: 'img/avatars/user0' + [index + 1] + '.png'
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
      y: getRandomArbitrary(CCORD_X, COORD_Y)
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
  removeClass('.map');

  for (var i = 0; i < 8; i++) {
    var pin = createPin(i);
    pins.push(pin);
  }

  pins.forEach(renderPin);
  mapPins.appendChild(fragment);
}

showPins();
