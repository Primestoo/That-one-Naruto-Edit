function previewImage(event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function(e) {
    const previewImage = document.getElementById('previewImage');
    previewImage.src = e.target.result;
    document.getElementById('previewContainer').style.display = 'block';
  }

  reader.readAsDataURL(file);
}

function convertImage() {
  const formatSelect = document.getElementById('formatSelect');
  const format = formatSelect.value;
  
  const previewImage = document.getElementById('previewImage');
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = previewImage.width;
  canvas.height = previewImage.height;
  ctx.drawImage(previewImage, 0, 0);

  const convertedImage = canvas.toDataURL('image/' + format);
  const convertedImageElement = document.getElementById('convertedImage');
  convertedImageElement.src = convertedImage;
  document.getElementById('convertedContainer').style.display = 'block';
}
