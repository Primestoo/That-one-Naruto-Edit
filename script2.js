async function removeBackground(imageData) {
  const apiKey = "ErLEQU8CU7aXDX72dV7kH5JX";

  try {
    const response = await fetch("https://api.remove.bg/v1.0/removebg", {
      method: "POST",
      headers: {
        "X-Api-Key": apiKey,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        image_file_b64: imageData.split(',')[1], // Extract base64 data from data URL
        size: "auto"
      })
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
