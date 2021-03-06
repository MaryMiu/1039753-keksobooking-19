'use strict';

(function () {
  var PINS_COUNT = 5;
  var priceRange = {
    low: {
      min: 0,
      max: 10000
    },
    middle: {
      min: 10000,
      max: 50000
    },
    high: {
      min: 50000,
      max: Infinity
    }
  };
  var mapFilters = document.querySelector('.map__filters');
  var filterControls = mapFilters.querySelectorAll('select, input');
  var typeHouse = mapFilters.querySelector('#housing-type');
  var priceHouse = mapFilters.querySelector('#housing-price');
  var roomsHouse = mapFilters.querySelector('#housing-rooms');
  var guestsHouse = mapFilters.querySelector('#housing-guests');
  var featuresHouse = mapFilters.querySelector('#housing-features');
  var data = [];
  var filteredData = [];

  window.filter = {
    activate: function (array) {
      data = array.slice(0);
      activateFilter();
      return array.slice(0, PINS_COUNT);
    },
    deactivate: function () {
      deactivateFilter();
    }
  };

  deactivateFilter();

  function filterControl(it, item, key) {
    return it.value === 'any' ? true : it.value === item[key].toString();
  }

  function filterByType(item) {
    return filterControl(typeHouse, item.offer, 'type');
  }

  function filterByPrice(item) {
    var filteringPrice = priceRange[priceHouse.value];
    return filteringPrice ? item.offer.price >= filteringPrice.min && item.offer.price <= filteringPrice.max : true;
  }

  function filterByRooms(item) {
    return filterControl(roomsHouse, item.offer, 'rooms');
  }

  function filterByGuests(item) {
    return filterControl(guestsHouse, item.offer, 'guests');
  }

  function filterByFeatures(item) {
    var checkedFeaturesControls = featuresHouse.querySelectorAll('input:checked');
    return Array.from(checkedFeaturesControls).every(function (element) {
      return item.offer.features.includes(element.value);
    });
  }

  var mapFiltersChangeHandler = window.debounce(function () {
    filteredData = data.slice(0);
    filteredData = filteredData.filter(filterByType).filter(filterByPrice).filter(filterByRooms).filter(filterByGuests).filter(filterByFeatures);
    window.pins.remove();
    window.card.remove();
    window.pins.create(filteredData.slice(0, PINS_COUNT));
  });

  function activateFilter() {
    filterControls.forEach(function (it) {
      it.disabled = false;
    });
    mapFiltersChangeHandler();
    mapFilters.addEventListener('change', mapFiltersChangeHandler);
  }

  function resetFilter() {
    filterControls.forEach(function (it) {
      it.value = 'any';
    });
    var featuresItems = featuresHouse.querySelectorAll('input');
    featuresItems.forEach(function (feature) {
      feature.checked = false;
    });
  }

  function deactivateFilter() {
    filterControls.forEach(function (it) {
      it.disabled = true;
    });
    resetFilter();
    mapFilters.removeEventListener('change', mapFiltersChangeHandler);
  }
})();
