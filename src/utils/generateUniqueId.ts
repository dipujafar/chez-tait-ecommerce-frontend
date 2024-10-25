export default function generateUniqueId() {
  const uniqueId = "id-" + Date.now() + "-" + Math.round(Math.random() * 1e9);

  return uniqueId;
}
