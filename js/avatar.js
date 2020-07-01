'use strict';

(function () {
  var IMAGE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var fileInput = window.dialog.userSetup.querySelector('input[type=file]');
  var setupAvatar = window.dialog.userSetup.querySelector('.setup-user-pic');
  var userAvatar = document.querySelector('.setup-open-icon');

  var changeAvatar = function () {
    var file = fileInput.files[0];
    var fileType = file.type.toLowerCase();

    var isValidType = IMAGE_TYPES.some(function (it) {
      return fileType.endsWith(it);
    });

    if (isValidType) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        setupAvatar.src = reader.result;
        userAvatar.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  };

  fileInput.addEventListener('change', changeAvatar);
})();
