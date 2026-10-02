const { cloudinary, isCloudinaryConfigured } = require("../config/cloudinary");

function uploadBufferToCloudinary(buffer, folder = "dermaai") {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: "auto" },
      (error, result) => {
        if (error) return reject(error);
        return resolve(result);
      }
    );
    stream.end(buffer);
  });
}

function toDataUrl(file) {
  const mime = file.mimetype || "image/jpeg";
  const base64 = file.buffer.toString("base64");
  return `data:${mime};base64,${base64}`;
}

async function uploadFileOrFallbackDataUrl(file, folder = "dermaai") {
  if (isCloudinaryConfigured()) {
    const result = await uploadBufferToCloudinary(file.buffer, folder);
    return result.secure_url;
  }

  return toDataUrl(file);
}

module.exports = { uploadFileOrFallbackDataUrl };
