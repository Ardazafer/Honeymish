export default function objToFormData(paramObj) {
  const formData = new FormData();
  Object.keys(paramObj).map((key) => {
    const value = paramObj[key];
    formData.append(key.toString(), value);
  });

  return formData;
}
