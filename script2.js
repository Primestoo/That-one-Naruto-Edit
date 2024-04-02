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

async function removeBackground(imageData) {
  const apiKey = "ErLEQU8CU7aXDX72dV7kH5JX";
  const formData = new FormData();
  formData.append("image_file", imageData);

  try {
    const response = await fetch("https://api.remove.bg/v1.0/removebg", {
      method: "POST",
      headers: {
        "X-Api-Key": apiKey
      },
      body: formData
    });

    if (!response.ok) {
      throw new Error("Failed to remove background");
    }

    const result = await response.blob();
    const processedImageUrl = URL.createObjectURL(result);

    return processedImageUrl;
  } catch (error) {
    console.error("Error:", error.message);
  }
}
