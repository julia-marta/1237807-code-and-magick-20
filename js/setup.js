'use strict';

(function () {
  var userForm = window.dialog.userSetup.querySelector('.setup-wizard-form');
  var wizards = [];

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

  // отправка данных формы на сервер и обработка результата
  var onSubmitForm = function (evt) {
    window.backend.save(new FormData(userForm), onSuccessSubmit, onError);
    evt.preventDefault();
  };

  // добавление обработчика на отправку формы
  userForm.addEventListener('submit', onSubmitForm);


  // функция присвоения рейтинга схожести каждому магу
  var getRank = function (wizard) {
    var rank = 0;
    if (wizard.colorCoat === window.wizard.coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === window.wizard.eyesColor) {
      rank += 1;
    }
    return rank;
  };

  // функция для сортировки имён магов по алфавиту
  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  // функция сортировки магов и отрисовки отсортированного списка
  var updateWizards = function () {

    var sortedWizards = wizards.slice().sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    });

    window.render.createWizards(sortedWizards);
  };

  // успешная загрузка данных: сохранение в массив и отрисовка отсортированного списка магов
  var onSuccessLoad = function (data) {
    wizards = data;
    updateWizards();
  };

  // загрузка данных с сервера и обработка результата
  window.backend.load(onSuccessLoad, onError);

  window.setup = {
    updateWizards: updateWizards
  };
})();
