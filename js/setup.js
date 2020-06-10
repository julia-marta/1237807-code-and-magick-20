'use strict';

var WIZARDS_COUNT = 4;
var ENTER_KEY = 'Enter';
var ESC_KEY = 'Escape';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var setupOpen = document.querySelector('.setup-open');
var userSetup = document.querySelector('.setup');
var setupClose = userSetup.querySelector('.setup-close');

var userForm = userSetup.querySelector('.setup-wizard-form');
var userNameInput = userSetup.querySelector('.setup-user-name');
var userSubmit = userSetup.querySelector('.setup-submit');

var setupWizard = userSetup.querySelector('.setup-wizard');
var wizardCoat = setupWizard.querySelector('.wizard-coat');
var wizardEyes = setupWizard.querySelector('.wizard-eyes');
var wizardFireball = userSetup.querySelector('.setup-fireball-wrap');

var coatColorInput = userSetup.querySelector('input[name=coat-color]');
var eyesColorInput = userSetup.querySelector('input[name=eyes-color]');
var fireballColorInput = userSetup.querySelector('input[name=fireball-color]');

var similarList = userSetup.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

// функция случайного выбора из массива

var getRandomData = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

// функции изменения цветов параметров персонажа + изменения полей форм

var changeFill = function (arr, parameter, input) {
  var newFill = getRandomData(arr);
  parameter.style.fill = newFill;
  input.value = newFill;
};

var changeColor = function (arr, parameter, input) {
  var newColor = getRandomData(arr);
  parameter.style.background = newColor;
  input.value = newColor;
};

// обработчик закрытия окна по нажатию на Esc

var onPopupEscPress = function (evt) {
  if (evt.key === ESC_KEY && !evt.target.classList.contains('setup-user-name')) {
    evt.preventDefault();
    closePopup();
  }
};

// функция открытия окна с настройками + добавление обработчика на Esc

var openPopup = function () {
  userSetup.classList.remove('hidden');

  document.addEventListener('keydown', onPopupEscPress);
};

// функция закрытия окна с настройками + удаление обработчика на Esc

var closePopup = function () {
  userSetup.classList.add('hidden');

  document.removeEventListener('keydown', onPopupEscPress);
};

// обработчик клика на аватарке

setupOpen.addEventListener('click', function () {
  openPopup();
});

// обработчик нажатия на Enter на аватарке

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    openPopup();
  }
});

// обработчик клика на кнопке закрытия попапа

if (userSetup) {
  setupClose.addEventListener('click', function () {
    closePopup();
  });
}

// обработчик нажатия на Enter на кнопке закрытия попапа

if (userSetup) {
  setupClose.addEventListener('keydown', function (evt) {
    if (evt.key === ENTER_KEY) {
      closePopup();
    }
  });
}

// обработчик отправки формы по клику на кнопку «Сохранить»

if (userSetup && userNameInput.valid) {
  userSubmit.addEventListener('click', function (evt) {
    evt.preventDefault();
    userForm.submit();
  });
}

// обработчик отправки формы по нажатию на Enter на кнопку «Сохранить»

if (userSetup && userNameInput.valid) {
  userSubmit.addEventListener('keydown', function (evt) {
    if (evt.key === ENTER_KEY) {
      evt.preventDefault();
      userForm.submit();
    }
  });
}

// обработчик изменения цвета мантии по клику

wizardCoat.addEventListener('click', function () {
  changeFill(COAT_COLORS, wizardCoat, coatColorInput);
});

// обработчик изменения цвета глаз по клику

wizardEyes.addEventListener('click', function () {
  changeFill(EYES_COLORS, wizardEyes, eyesColorInput);
});

// обработчик изменения цвета фаерболов по клику

wizardFireball.addEventListener('click', function () {
  changeColor(FIREBALL_COLORS, wizardFireball, fireballColorInput);
});

// функция создания массива с данными магов

var wizards = [];

var getWizards = function () {
  for (var i = 0; i < WIZARDS_COUNT; i++) {
    wizards.push({
      name: getRandomData(WIZARD_NAMES) + ' ' + getRandomData(WIZARD_SURNAMES),
      coatColor: getRandomData(COAT_COLORS),
      eyesColor: getRandomData(EYES_COLORS)
    });
  }
};

// создание массива с данными магов

getWizards();

// функция создания элемента с магом на основе данных из массива

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

// функция отрисовки магов на странице

var createWizards = function (arr) {
  var wizardsFragment = document.createDocumentFragment();
  for (var i = 0; i < arr.length; i++) {
    wizardsFragment.appendChild(renderWizard(arr[i]));
  }

  return similarList.appendChild(wizardsFragment);
};

// отрисовка магов в список похожих магов

createWizards(wizards);

// показ списка похожих магов

userSetup.querySelector('.setup-similar').classList.remove('hidden');
