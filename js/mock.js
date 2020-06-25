'use strict';

(function () {
  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

  // функция создания массива с мок-данными магов
  var wizardsArray = [];

  var getWizards = function () {
    for (var i = 0; i < window.render.WIZARDS_COUNT; i++) {
      wizardsArray.push({
        name: window.util.getRandomData(WIZARD_NAMES) + ' ' + window.util.getRandomData(WIZARD_SURNAMES),
        coatColor: window.util.getRandomData(window.wizard.COAT_COLORS),
        eyesColor: window.util.getRandomData(window.wizard.EYES_COLORS)
      });
    }
  };

  // создание массива с мок-данными магов
  getWizards();

})();
