'use strict';

(function () {
  var WIZARDS_COUNT = 4;
  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

  var similarList = window.dialog.userSetup.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

  // функция создания массива с данными магов
  var wizards = [];

  var getWizards = function () {
    for (var i = 0; i < WIZARDS_COUNT; i++) {
      wizards.push({
        name: window.util.getRandomData(WIZARD_NAMES) + ' ' + window.util.getRandomData(WIZARD_SURNAMES),
        coatColor: window.util.getRandomData(window.setup.COAT_COLORS),
        eyesColor: window.util.getRandomData(window.setup.EYES_COLORS)
      });
    }
  };

  // создание массива с данными магов
  getWizards();

  // функция создания элемента с магом на основе данных из массива
  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  // успешное получение данных: отрисовка и показ 4-х случайных похожих магов на странице
  var onSuccessLoad = function (wizardsArray) {
    var randomWizards = window.util.shuffleArray(wizardsArray).slice(0, WIZARDS_COUNT);
    var wizardsFragment = document.createDocumentFragment();
    for (var i = 0; i < randomWizards.length; i++) {
      wizardsFragment.appendChild(renderWizard(randomWizards[i]));
    }
    window.dialog.userSetup.querySelector('.setup-similar').classList.remove('hidden');
    similarList.appendChild(wizardsFragment);
  };

  // загрузка с сервера массива с похожими магами и обработка данных
  window.backend.load(onSuccessLoad, window.setup.onError);
})();
