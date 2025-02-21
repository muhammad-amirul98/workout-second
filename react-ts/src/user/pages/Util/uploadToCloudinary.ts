export const uploadToCloudinary = async (pics: File | Blob) => {
  const cloud_name = "doiwbgb25";
  const upload_preset = "workout";
  if (pics) {
    const data = new FormData();
    data.append("file", pics);
    data.append("cloud_name", cloud_name);
    data.append("upload_preset", upload_preset);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
      {
        method: "POST",
        body: data,
      }
    );

    const fileData = await res.json();
    return fileData.url;
  } else {
    console.log("Error: No image found.");
  }
};
