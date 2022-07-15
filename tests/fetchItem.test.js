require('../mocks/fetchSimulator'); 
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  it('este se "fetchItem" é uma função;', () =>{
    expect(typeof(fetchItem)).toBe('function') 
  }) 
  it('Execute a função fetchItem com o argumento do item "MLB1615760527" e teste se fetch foi chamada;', async() =>{
    await fetchItem('MLB1615760527')
    expect((fetch)).toBeCalled() 
  }) 
  it('Teste se, ao chamar a função fetchItem com o argumento "MLB1615760527", a função fetch utiliza a url "https://api.mercadolibre.com/items/MLB1615760527";', async () =>{
   await fetchItem('MLB1615760527')
    expect((fetch)).toBeCalledWith("https://api.mercadolibre.com/items/MLB1615760527") 
  }) 
  it('Teste se o retorno da função fetchItem com o argumento do item "MLB1615760527" é uma estrutura de dados igual ao objeto item que já está importado no arquivo.', async() =>{
    
    expect((await fetchItem('MLB1615760527'))).toEqual(item) 
  }) 
  it('Teste se, ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: "You must provide an url".', async() =>{
    
    expect((await fetchItem())).toEqual(new Error('You must provide an url')) 
  }) 
});
