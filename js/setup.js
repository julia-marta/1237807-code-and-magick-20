'use strict';

(function () {
  var userForm = window.dialog.userSetup.querySelector('.setup-wizard-form');
  var setupWizard = window.dialog.userSetup.querySelector('.setup-wizard');
  var wizardCoat = setupWizard.querySelector('.wizard-coat');
  var wizardEyes = setupWizard.querySelector('.wizard-eyes');
  var wizardFireball = window.dialog.userSetup.querySelector('.setup-fireball-wrap');
  var coatColorInput = window.dialog.userSetup.querySelector('input[name=coat-color]');
  var eyesColorInput = window.dialog.userSetup.querySelector('input[name=eyes-color]');
  var fireballColorInput = window.dialog.userSetup.querySelector('input[name=fireball-color]');

  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

  // ошибка при получении или отправке данных: добавление сообщения об ошибке на страницу
  var onError = function (errorMessage) {
    var error = document.createElement('div');
    error.style = 'z-index: 100; margin: 0 auto; text-align: center';
    error.style.width = '800px';
    error.style.height = '90px';
    error.style.paddingTop = '45px';
    error.style.backgroundColor = 'navy';
    error.style.border = '5px solid white';
    error.style.position = 'absolute';
    error.style.top = '180px';
    error.style.left = 0;
    error.style.right = 0;
    error.style.fontSize = '35px';
    error.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', error);
  };

  // успешная отправка данных: скрытие окна и сообщение (факультативно)
  var onSuccessSubmit = function (response) {
    window.dialog.userSetup.classList.add('hidden');
    var message = document.createElement('div');
    message.style = 'z-index: 100; margin: 0 auto; text-align: center';
    message.style.width = '800px';
    message.style.height = '90px';
    message.style.paddingTop = '40px';
    message.style.paddingBottom = '25px';
    message.style.backgroundColor = 'GreenYellow';
    message.style.color = 'black';
    message.style.border = '5px solid black';
    message.style.position = 'absolute';
    message.style.top = '180px';
    message.style.left = 0;
    message.style.right = 0;
    message.style.fontSize = '35px';
    message.textContent = 'Ура,' + response.username + '! Ваши данные успешно отправлены';
    document.body.insertAdjacentElement('afterbegin', message);
  };

  // функция отправки данных формы на сервер
  var onSubmitForm = function (evt) {
    window.backend.save(new FormData(userForm), onSuccessSubmit, onError);
    evt.preventDefault();
  };

  // добавление обработчика на отправку формы
  userForm.addEventListener('submit', onSubmitForm);

  // функция настройки обработчиков для изменения параметров персонажа
  var changeColor = function (element, arr, input) {
    element.addEventListener('click', function () {
      var newColor = window.util.getRandomData(arr);
      if (element === wizardFireball) {
        element.style.backgroundColor = newColor;
      } else {
        element.style.fill = newColor;
      }
      input.value = newColor;
    });
  };

  // добавление обработчика изменения цвета мантии по клику
  changeColor(wizardCoat, COAT_COLORS, coatColorInput);

  // добавление обработчика изменения цвета глаз по клику
  changeColor(wizardEyes, EYES_COLORS, eyesColorInput);

  // добавление обработчика изменения цвета фаерболов по клику
  changeColor(wizardFireball, FIREBALL_COLORS, fireballColorInput);

  window.setup = {
    onError: onError,
    COAT_COLORS: COAT_COLORS,
    EYES_COLORS: EYES_COLORS
  };
})();
