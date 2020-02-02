'use strict';
var map = document.querySelector('.map__pins');
var template = document.querySelector('#pin').content.querySelector('.map__pin');
var fragment = document.createDocumentFragment();
var pin = {
  'author': {
    'avatar': 'img/avatars/user05.png'
  },
  'offer': {
    'title': 'Заголовок предложения',
    'address': '600, 350',
    'price': 5000,
    'type': 'palace',
    'rooms': 3,
    'guests': 2,
    'checkin': '12:00',
    'checkout': '13:00',
    'features': ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
    'description': 'lorem',
    'photos': ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
  },

  'location': {
    'x': 100,
    'y': 500
  },
};

document.querySelector('.map').classList.remove('map--faded');

var renderPin = function (elem) {
  var pinOnMap = template.cloneNode(true);
  var pinX = elem.location.x;
  var pinY = elem.location.y;
  pinOnMap.src = elem.author.avatar;
  pinOnMap.style.left = pinX;
  pinOnMap.style.top = pinY;
  //pinOnMap.setAttribute('style', 'left: ' + pinX + '; top:' + pinY);
  console.log(elem);
  return elem;
};

for (var i = 0; i < 8; i++) {
  var el = template.cloneNode(true);
  // fragment.appendChild(renderPin(pin));
}
// map.appendChild(fragment);
