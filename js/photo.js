'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarChooser = document.querySelector('.ad-form__field input[type=file]');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var fileChooser = document.querySelector('.ad-form__upload input[type=file]');
  var filePreview = document.querySelector('.ad-form__photo');

  avatarChooser.addEventListener('change', inputChangeHandler(avatarPreview));
  fileChooser.addEventListener('change', inputChangeHandler(filePreview));

  function inputChangeHandler(preview) {
    return function (evt) {
      var file = evt.target.files[0];
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          if (preview.src) {
            preview.src = reader.result;
          } else {
            var image = document.createElement('img');
            image.src = reader.result;
            image.width = 40;
            image.height = 40;
            image.alt = 'Фотография жилья';
            preview.appendChild(image);
          }
        });

        reader.readAsDataURL(file);
      }
    };
  }
})();
