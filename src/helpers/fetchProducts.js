const fetchProducts = async (param) => {
  console.log(param);
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${param}`;
 
  try {
    const response = await fetch(url); 
    const data = await response.json();
    return data;
  } catch (err) {
    return `${err}`;
  }
};
 
if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
