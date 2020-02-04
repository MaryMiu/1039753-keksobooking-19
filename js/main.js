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
var pinPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
var mapPins = document.querySelector('.map__pins');
var fragment = document.createDocumentFragment();
var MAP_WIDTH = 1200;
var MAP_HEIGHT = 704;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

function removeClass(el) {
  document.querySelector(el).classList.remove('map--faded');
}

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function makeRandomArray() {
  return Math.random() - 0.5;
};

function calcPinPositionX(x) {
  return x - (PIN_WIDTH / 2) + 'px';
}

function calcPinPositionY(y) {
  return y - (PIN_HEIGHT) + 'px';
}

function createPin(index) {
  return {
    'author': {
      'avatar': 'img/avatars/user0' + [index + 1] + '.png'
    },
    'offer': {
      'title': pinTitle[index],
      'address': 'text',
      'price': pinPrice[index],
      'type': pinType[index],
      'rooms': pinRooms[index],
      'guests': pinGuests[getRandomArbitrary(0, pinGuests.length)],
      'checkin': pinCheckin[index],
      'checkout': pinCheckout[index],
      'features': pinFeatures.sort(makeRandomArray),
      'description': pinDescription[index],
      'photos': 'http://o0.github.io/assets/images/tokyo/hotel1.jpg, http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    },

    'location': {
      'x': getRandomArbitrary(0, MAP_WIDTH),
      'y': getRandomArbitrary(130, 630)
    }
  }
}

function renderPin(elem) {
  var pinCloneTemplate = pinTemplate.cloneNode(true);
  pinCloneTemplate.style.left = calcPinPositionX(elem.location.x);
  pinCloneTemplate.style.top = calcPinPositionY(elem.location.y);
  pinCloneTemplate.querySelector('img').src = elem.author.avatar;
  pinCloneTemplate.querySelector('img').alt = elem.offer.title;
  fragment.appendChild(pinCloneTemplate);
}

removeClass('.map');

for (let i = 0; i < 8; i++) {
  var pin = createPin(i);
  pins.push(pin);
}

pins.forEach(renderPin);
mapPins.appendChild(fragment);
