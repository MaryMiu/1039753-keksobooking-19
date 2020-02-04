'use strict';
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var pins = [];
var pinTitle = ['Заголовок предложения 1', 'Заголовок предложения 2', 'Заголовок предложения 3', 'Заголовок предложения 4', 'Заголовок предложения 5', 'Заголовок предложения 6', 'Заголовок предложения 7', 'Заголовок предложения 8'];
var pinPrice = [1200, 3400, 200, 400, 1400, 5000, 12000, 4500];
var pinType = ['palace', 'flat', 'house', 'bungalo', 'palace', 'flat', 'house', 'bungalo'];
var pinRooms = [2, 1, 3, 4, 2, 2, 6, 1];
var pinGuests = [2, 1, 3, 3, 2, 2, 1, 1];
var pinCheckin = ['12:00', '13:00', '14:00', '12:00', '13:00', '14:00', '12:00', '13:00'];
var pinCheckout = ['13:00', '14:00', '12:00', '13:00', '14:00', '12:00', '13:00', '12:00'];
var pinFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var pinDescription = ['строка с описанием 1', 'строка с описанием 2', 'строка с описанием 3', 'строка с описанием 4', 'строка с описанием 5', 'строка с описанием 6', 'строка с описанием 7', 'строка с описанием 8'];
var pinPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var mapPins = document.querySelector('.map__pins');
var fragment = document.createDocumentFragment();
var MAP_WIDTH = 1200;
var CCORD_X = 130;
var COORD_Y = 630;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

function removeClass(el) {
  document.querySelector(el).classList.remove('map--faded');
}

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function createPin(index) {
  var pin = {
    'author': {
      'avatar': 'img/avatars/user0' + [index + 1] + '.png'
    },
    'offer': {
      'title': pinTitle[index],
      'address': function () {
        var addressX = pin.location.x;
        var addressY = pin.location.y;
        return addressX + ', ' + addressY;
      },
      'price': pinPrice[index],
      'type': pinType[index],
      'rooms': pinRooms[index],
      'guests': pinGuests[getRandomArbitrary(0, pinGuests.length)],
      'checkin': pinCheckin[index],
      'checkout': pinCheckout[index],
      'features': pinFeatures.slice(0, [getRandomArbitrary(1, pinFeatures.length + 1)]),
      'description': pinDescription[index],
      'photos': pinPhotos.slice(0, [getRandomArbitrary(1, pinPhotos.length + 1)]),
    },

    'location': {
      'x': getRandomArbitrary(0, MAP_WIDTH),
      'y': getRandomArbitrary(CCORD_X, COORD_Y),
      'calcPinPositionX': function () {
        return this.x - (PIN_WIDTH / 2);
      },
      'calcPinPositionY': function () {
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

removeClass('.map');

for (var i = 0; i < 8; i++) {
  var pin = createPin(i);
  pins.push(pin);
}

pins.forEach(renderPin);
mapPins.appendChild(fragment);
