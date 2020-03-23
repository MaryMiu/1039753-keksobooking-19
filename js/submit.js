'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var form = document.querySelector('.ad-form');

  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), successHandler, errorHandler);
    evt.preventDefault();
  });

  document.addEventListener('keydown', documentKeydownHandler);

  function successHandler() {
    showMessage('#success', '.success');
  }

  function errorHandler() {
    showMessage('#error', '.error');
  }

  function showMessage(template, node) {
    var messageTemplate = document.querySelector(template).content.querySelector(node);
    var messageCloneTemplate = messageTemplate.cloneNode(true);
    var main = document.querySelector('main');
    messageCloneTemplate.addEventListener('click', messageClickHandler(node));
    main.append(messageCloneTemplate);
    window.map.reset();
  }

  function documentKeydownHandler(evt) {
    if (evt.key === ESC_KEY) {
      var errorMessage = document.querySelector('.error');
      var successMessage = document.querySelector('.success');
      if (successMessage || errorMessage) {
        if (successMessage) {
          successMessage.remove();
        } else {
          errorMessage.remove();
        }
      }
    }
  }

  function messageClickHandler(elem) {
    return function () {
      var successMessage = document.querySelector(elem);
      successMessage.remove();
    };
  }
})();
