'use strict';

(function () {
  var SUCCESS_STATUS = 200;
  var TIMEOUT = 10000;

  window.backend = {
    load: function (xhrLoadHandler, xhrErrorHandler) {
      var xhr = createXHR('GET', 'https://js.dump.academy/keksobooking/data');

      xhr.addEventListener('load', function () {
        if (xhr.status === SUCCESS_STATUS) {
          xhrLoadHandler(xhr.response);
        } else {
          xhrErrorHandler('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        xhrErrorHandler('Произошла ошибка соединения');
      });
      xhr.addEventListener('timeout', function () {
        xhrErrorHandler('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = TIMEOUT;

      xhr.send();
    },
    save: function (data, xhrLoadHandler, xhrErrorHandler) {
      var xhr = createXHR('POST', 'https://js.dump.academy/keksobooking');

      xhr.addEventListener('load', function () {
        if (xhr.status === SUCCESS_STATUS) {
          xhrLoadHandler(xhr.response);
        } else {
          xhrErrorHandler('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.send(data);
    }
  };

  function createXHR(method, url) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open(method, url);
    return xhr;
  }

})();
