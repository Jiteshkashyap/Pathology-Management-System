export const calculatePackagePrice = (pkg) => {
  const total = pkg.tests.reduce((sum, t) => sum + t.price, 0);

  return total - (total * pkg.discountPercentage) / 100;
};

export const calculateTestsPrice = (tests) => {
  return tests.reduce((sum, t) => sum + t.price, 0);
};