'use strict';

(function () {
  var form = document.querySelector('.ad-form');
  var ESC_KEY = 'Escape';

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
      var messages = document.querySelectorAll('.success', '.error');
      if (messages) {
        messages.forEach(function (message) {
          message.remove();
        });
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
