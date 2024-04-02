async function handleImageUpload(event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = async function(e) {
    const originalImage = document.getElementById('originalImage');
    originalImage.src = e.target.result;

    // Show the "Original Image" text and image preview
    document.getElementById('originalImageContainer').style.display = 'block';

    // Call the function to remove background and display processed image
    const processedImageUrl = await removeBackground(e.target.result);

    // Show the "Background Removed" text and processed image
    document.getElementById('processedImageText').style.display = 'block';
    document.getElementById('processedImage').src = processedImageUrl;
    document.getElementById('processedImageContainer').style.display = 'block';
  }

  reader.readAsDataURL(file);
}
