require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  it('teste se "fetchProducts" é uma função', () => {
    expect(typeof (fetchProducts)).toBe('function')
  })
  it('Execute a função fetchProducts com o argumento "computador" e veja se fetch foi chamada', async () => {
    await fetchProducts('computador')
    expect(fetch).toBeCalled()
  })
  it('Teste se, ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint https://api.mercadolibre.com/sites/MLB/search?q=computador', async () => {
    // espero que quando chamar a func fetchP com o arg compu a func  fetch utiliza endpoint  ...
    await fetchProducts('computador')
    expect(fetch).toBeCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador')
  })
  it('Teste se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch.', async () => {
      expect( await fetchProducts('computador')).toEqual(computadorSearch)
  })
  it('Teste se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: "You must provide an url".', async () => {
    expect(await fetchProducts()).toEqual(("Error: You must provide an url"))
 })
});
