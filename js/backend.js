'use strict';

(function () {
  window.backend = {
    load: function (onLoad, onError) {
      var xhr = createXHR('GET', 'https://js.dump.academy/keksobooking/data');

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });
      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = 10000;

      xhr.send();
    },
    save: function (data, onLoad, onError) {
      var xhr = createXHR('POST', 'https://js.dump.academy/keksobooking');

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
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
