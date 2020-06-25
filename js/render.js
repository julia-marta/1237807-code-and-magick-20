'use strict';

(function () {

  var WIZARDS_COUNT = 4;

  var similarSection = window.dialog.userSetup.querySelector('.setup-similar');
  var similarList = window.dialog.userSetup.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

  // функция создания элемента с магом
  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  // функция отрисовки и показа 4-х похожих магов на странице
  var createWizards = function (wizards) {
    var takeNumber = wizards.length > WIZARDS_COUNT ? WIZARDS_COUNT : wizards.length;
    similarList.innerHTML = '';
    for (var i = 0; i < takeNumber; i++) {
      similarList.appendChild(renderWizard(wizards[i]));
    }

    similarSection.classList.remove('hidden');
  };

  window.render = {
    WIZARDS_COUNT: WIZARDS_COUNT,
    createWizards: createWizards
  };
})();
