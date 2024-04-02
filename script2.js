async function removeBackground(imageData) {
  const apiKey = "ErLEQU8CU7aXDX72dV7kH5JX";
  const formData = new FormData();
  formData.append("image_file", imageData);

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "https://api.remove.bg/v1.0/removebg", true);
  xhr.setRequestHeader("X-Api-Key", apiKey);

  let startTime = new Date().getTime();
  let remainingTimePopup;

  xhr.upload.addEventListener("progress", function(event) {
    const elapsedTime = new Date().getTime() - startTime;
    const totalBytes = event.total || event.totalSize;
    const uploadedBytes = event.loaded;
    const uploadSpeed = uploadedBytes / (elapsedTime / 1000);
    const estimatedRemainingTime = (totalBytes - uploadedBytes) / uploadSpeed;

    if (!remainingTimePopup) {
      remainingTimePopup = document.createElement("div");
      remainingTimePopup.id = "remainingTimePopup";
      remainingTimePopup.style.position = "fixed";
      remainingTimePopup.style.top = "50px";
      remainingTimePopup.style.right = "50px";
      remainingTimePopup.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
      remainingTimePopup.style.padding = "10px";
      remainingTimePopup.style.borderRadius = "5px";
      document.body.appendChild(remainingTimePopup);
    }

    remainingTimePopup.textContent = "Estimated remaining time: " + Math.round(estimatedRemainingTime) + " seconds";
  });

  const responsePromise = new Promise((resolve, reject) => {
    xhr.onload = function() {
      if (xhr.status === 200) {
        resolve(xhr.response);
      } else {
        reject(new Error("Failed to remove background: " + xhr.status + " " + xhr.statusText));
      }
    };
    xhr.onerror = function() {
      reject(new Error("Failed to send request to remove background"));
    };
  });

  xhr.send(formData);

  try {
    const response = await responsePromise;
    const processedImageUrl = URL.createObjectURL(response);
    return processedImageUrl;
  } catch (error) {
    console.error("Error removing background:", error.message);
    throw error;
  }
        }
