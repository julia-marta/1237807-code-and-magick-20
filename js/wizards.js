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
  window.dialog.userSetup.querySelector('.setup-similar').classList.remove('hidden');

})();
