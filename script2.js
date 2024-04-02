async function removeBackground(imageData) {
  const apiKey = "YOUR_API_KEY_HERE"; // Replace with your actual API key
  const url = "https://api.remove.bg/v1.0/removebg";
  const formData = new FormData();
  formData.append("image_file", imageData);
  formData.append("size", "auto");

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "X-Api-Key": apiKey
      },
      body: formData
    });

    if (!response.ok) {
      throw new Error("Failed to remove background: " + response.statusText);
    }

    const result = await response.blob();
    const processedImageUrl = URL.createObjectURL(result);

    return processedImageUrl;
  } catch (error) {
    console.error("Error:", error.message);
    throw error; // Rethrow the error to handle it elsewhere if needed
  }
}
