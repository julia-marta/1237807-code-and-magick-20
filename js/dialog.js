'use strict';

(function () {
  var setupOpen = document.querySelector('.setup-open');
  var userSetup = document.querySelector('.setup');
  var setupClose = userSetup.querySelector('.setup-close');

  var userSetupDefaultCoords = {
    x: userSetup.style.left,
    y: userSetup.style.top
  };

  // обработчик закрытия окна по нажатию на Esc, если инпут не в фокусе
  var onPopupEscPress = function (evt) {
    if (!evt.target.classList.contains('setup-user-name')) {
      window.util.isEscEvent(evt, closePopup);
    }
  };

  // функция открытия окна с настройками + добавление обработчика на Esc
  var openPopup = function () {
    userSetup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  // функция закрытия окна с настройками + удаление обработчика на Esc + сброс координат на исходные
  var closePopup = function () {
    userSetup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    userSetup.style.left = userSetupDefaultCoords.x;
    userSetup.style.top = userSetupDefaultCoords.y;
  };

  // добавление обработчика клика на аватарке
  setupOpen.addEventListener('click', function () {
    openPopup();
  });

  // добавление обработчика нажатия на Enter на аватарке
  setupOpen.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openPopup);
  });

  // добавление обработчика клика на кнопке закрытия попапа
  if (userSetup) {
    setupClose.addEventListener('click', function () {
      closePopup();
    });
  }

  // добавление обработчика нажатия на Enter на кнопке закрытия попапа
  if (userSetup) {
    setupClose.addEventListener('keydown', function (evt) {
      window.util.isEnterEvent(evt, closePopup);
    });
  }

  window.dialog = {
    userSetup: userSetup
  };
})();
