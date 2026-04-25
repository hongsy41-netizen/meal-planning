// Emart URL builder for product search
export const buildEmartSearchURL = (query) => {
  // Emart online search URL pattern
  const encodedQuery = encodeURIComponent(query);
  return `https://www.emart24.co.kr/emart24/storeSearch?searchKeyword=${encodedQuery}`;
};

export const buildEmartProductURL = (category, productId) => {
  // Emart product detail URL pattern
  return `https://www.emart24.co.kr/product/${category}/${productId}`;
};