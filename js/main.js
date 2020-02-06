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

function getRandomTitle() {
  var titles = ['Квартирка в центре', 'Апартаменты рядом с императорским дворцом', 'Студия на Такэсита', 'Эко-Апартаменты в Одайба', 'Чистая квартира с красивым видом на Сумиду', 'Новая квартира, тепло, уютно, 200 этаж', 'Апартаменты над телевизионной башней', 'Уютная квартира рядом с вокзалом'];
  return titles[getRandomArbitrary(0, titles.length)];
}

function getRandomDescription() {
  var description = ['Можно разместить 20 человек! Удачное расположение в центре и близость к техника, постельное белье, полотенца. Чистая ванна.Wi-Fi на всей территории. Можно с животными.', 'Квартира оборудована всем необходимым от постельного белья до современной бытовой техники, а так же имеется безлимитный бесплатный Wi-Fi Интернет. И, извините, мы не говорим по-русски.', 'Новый дом, современный ремонт, идеальная чистота, безупречное белье, есть все для комфортного проживания.', 'Уютная, тёплая квартира с шикарным местоположением. Рядом железнодорожный вокзал и станция метро, супермаркеты и парикмахерские.'];
  return description[getRandomArbitrary(0, description.length)];
}

function getRandomTime() {
  //var hour = ['12:00', '13:00', '14:00'];
  return ['12:00', '13:00', '14:00'][getRandomArbitrary(0, 3)];
}

function getRandomImage() {
  var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  return photos.slice(0, [getRandomArbitrary(1, photos.length + 1)]);
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
      y: getRandomArbitrary(CCORD_X, COORD_Y),
      calcPinPositionX: function () {
        return this.x - (PIN_WIDTH / 2);
      },
      calcPinPositionY: function () {
        return this.y - (PIN_HEIGHT);
      }
    }
  };
  return pin;
}

function renderPin(elem) {
  var pinCloneTemplate = pinTemplate.cloneNode(true);
  pinCloneTemplate.style.left = elem.location.calcPinPositionX() + 'px';
  pinCloneTemplate.style.top = elem.location.calcPinPositionY() + 'px';
  pinCloneTemplate.querySelector('img').src = elem.author.avatar;
  pinCloneTemplate.querySelector('img').alt = elem.offer.title;
  elem.offer.address();
  fragment.appendChild(pinCloneTemplate);
}

(function showPins() {
  removeClass('.map');

  for (var i = 0; i < 8; i++) {
    var pin = createPin(i);
    pins.push(pin);
  }

  pins.forEach(renderPin);
  mapPins.appendChild(fragment);
})();
