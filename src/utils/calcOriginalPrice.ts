const calculateOriginalPrice = (finalPrice: number, discounts: number[]) => {
  let remainingFactor = 1;

  for (const discount of discounts) {
    if (!discount || discount === 0) continue;
    remainingFactor *= 1 - discount / 100;
  }

  return parseFloat((finalPrice / remainingFactor).toFixed(2));
};

export default calculateOriginalPrice;
