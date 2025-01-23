export const createFormData = (payload: Record<string, any>): FormData => {
  const formData = new FormData();


  Object.entries(payload).forEach(([key, value]) => {
    if (key === "image" && value) {
      // Handle the `image` field specifically
      if (value instanceof File) {
        formData.append(key, value); // Append File object directly
      } else if (value.path) {
        // Create a File object using `path` and `relativePath`
        const file = new File([value.path], value.relativePath || "image.png");
        formData.append(key, file);
      } else {
        throw new Error("Invalid image field: expected File or path/relativePath structure.");
      }
    } else if (value !== undefined && value !== null) {
      formData.append(key, String(value)); // Convert other values to strings
    }
  });

  return formData;
};
