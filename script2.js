async function handleImageUpload(event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = async function(e) {
    const originalImage = document.getElementById('originalImage');
    originalImage.src = e.target.result;

    // Show the "Original Image" text and image preview
    document.getElementById('originalImageContainer').style.display = 'block';

    // Call the function to remove background and display processed image
    try {
      const processedImageUrl = await removeBackground(e.target.result);
      const processedImage = document.getElementById('processedImage');
      processedImage.src = processedImageUrl;
      document.getElementById('processedImageContainer').style.display = 'block';
    } catch (error) {
      console.error("Error removing background:", error);
      alert("Failed to remove background. Please try again.");
    }
  }

  reader.readAsDataURL(file);
}
