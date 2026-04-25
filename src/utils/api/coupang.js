// Coupang URL builder for product search and cart
export const buildCoupangSearchURL = (query) => {
  // Coupang search URL pattern
  const encodedQuery = encodeURIComponent(query);
  return `https://www.coupang.com/np/search?component=&q=${encodedQuery}&channel=user`;
};

export const buildCoupangCartURL = (productId) => {
  // Coupang add to cart URL pattern (simplified)
  // Note: Actual cart addition may require authentication and more complex flow
  return `https://www.coupang.com/vp/products/${productId}?addToCart=true`;
};