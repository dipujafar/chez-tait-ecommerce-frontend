// @ts-ignore
export default function discountedPrice(price, discount) {
  const newPrice = Number(price) * (1 - Number(discount) / 100);
  return Number(newPrice).toFixed(2);
}
