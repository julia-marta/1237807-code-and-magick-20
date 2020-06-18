'use strict';

(function () {
  var statusCode = {
    OK: 200
  };
  var TIMEOUT_IN_MS = 10000;
  var URL_TO_GET = 'https://javascript.pages.academy/code-and-magick/data';
  var URL_TO_POST = 'https://javascript.pages.academy/code-and-magick';
  var GET = 'GET';
  var POST = 'POST';

  var dataHandler = function (method, url, data, onLoad, onError) {

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT_IN_MS;
    xhr.open(method, url);
    xhr.send(data);

    xhr.addEventListener('load', function () {
      if (xhr.status === statusCode.OK) {
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
  };

  window.backend = {
    load: function (onLoad, onError) {
      dataHandler(GET, URL_TO_GET, null, onLoad, onError);
    },
    save: function (data, onLoad, onError) {
      dataHandler(POST, URL_TO_POST, data, onLoad, onError);
    }
  };
})();
