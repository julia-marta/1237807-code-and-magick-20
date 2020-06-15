'use strict';

(function () {

  var userForm = window.dialog.userSetup.querySelector('.setup-wizard-form');
  var userNameInput = window.dialog.userSetup.querySelector('.setup-user-name');
  var userSubmit = window.dialog.userSetup.querySelector('.setup-submit');

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

  window.setup = {
    COAT_COLORS: COAT_COLORS,
    EYES_COLORS: EYES_COLORS
  };

  // функция отправки формы
  var submitForm = function (evt) {
    evt.preventDefault();
    userForm.submit();
  };

  // добавление обработчиков на кнопку отправки формы
  if (window.dialog.userSetup && userNameInput.valid) {
    userSubmit.addEventListener('click', submitForm);
    userSubmit.addEventListener('keydown', function (evt) {
      window.util.isEnterEvent(evt, submitForm);
    });
  }

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

})();
