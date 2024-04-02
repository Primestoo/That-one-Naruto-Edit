async function handleImageUpload(event) {
  const file = event.target.files[0];
  const imageData = new FormData();
  imageData.append("image_file", file);

  try {
    const processedImageBlob = await removeBackground(imageData);
    displayProcessedImage(processedImageBlob);
  } catch (error) {
    console.error("Error:", error.message);
    // Handle the error, e.g., display an error message to the user
  }
}

function displayProcessedImage(imageBlob) {
  const processedImageElement = document.getElementById('processedImage');
  processedImageElement.src = URL.createObjectURL(imageBlob);
}

async function removeBackground(imageData) {
  const apiKey = "YOUR_API_KEY_HERE"; // Replace with your actual API key
  const url = "https://api.remove.bg/v1.0/removebg";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "X-Api-Key": apiKey
      },
      body: imageData
    });

    if (!response.ok) {
      throw new Error("Failed to remove background: " + response.statusText);
    }

    return await response.blob();
  } catch (error) {
    console.error("Error:", error.message);
    throw error; // Rethrow the error to handle it elsewhere if needed
  }
}
