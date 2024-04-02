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
      throw new Error("Failed to remove background. HTTP status: " + response.status);
    }

    const result = await response.blob();
    const processedImageUrl = URL.createObjectURL(result);

    return processedImageUrl;
  } catch (error) {
    console.error("Error:", error.message);
    throw new Error("Failed to process image: " + error.message);
  }
}
