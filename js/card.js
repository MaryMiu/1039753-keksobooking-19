'use strict';

(function () {
  var fragment = document.createDocumentFragment();

  window.card = {
    data: [],
    render: function (elem) {
      var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
      var cardCloneTemplate = cardTemplate.cloneNode(true);
      cardCloneTemplate.querySelector('.popup__title').textContent = elem.offer.title;
      cardCloneTemplate.querySelector('.popup__text--address').textContent = elem.offer.address;
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
      cardCloneTemplate.querySelector('.popup__close').addEventListener('click', buttonCardCloseHandler);
      fragment.appendChild(cardCloneTemplate);
    },
    create: function (index) {
      var map = document.querySelector('.map');
      this.render(window.card.data[index]);
      map.appendChild(fragment);
    },
    remove: function () {
      var mapCard = document.querySelector('.map__card');
      if (mapCard) {
        mapCard.remove();
      }
    }
  };

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

  function buttonCardCloseHandler() {
    window.card.remove();
  }
})();
