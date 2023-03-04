const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};
const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  return section;
};
const sectionContainer = document.querySelector('.container');
  const sectionItemss = document.querySelector('.items');
  const divMensagem = document.createElement('div');
function mensagem(param) {
if (param === true) {
  divMensagem.className = 'loading';
  divMensagem.innerText = 'carregando...';
  sectionContainer.insertBefore(divMensagem, sectionItemss);
} else {
 divMensagem.remove();
}
} 
const addChildsSectionItems = async () => {
  const sectionItems = document.querySelector('.items');
  mensagem(true);
  const { results } = await (fetchProducts('computador'));
  mensagem(false);
    results.forEach(({ id, title, thumbnail }) => {
   const addItemsInSection = createProductItemElement({ sku: id, name: title, image: thumbnail }); 
   sectionItems.appendChild(addItemsInSection);
   });
 };

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const cartItemClickListener = (event) => {
  const li = document.getElementsByClassName('cart__item');

    (event.target.remove());

    const array = [...li];
    const array2 = [];
    array.forEach((item) => array2.push(item.innerHTML));
    saveCartItems(JSON.stringify(array2));
  };
  
  const totalPrice = document.createElement('li');

  function calculaCarrinhho() {
    const section = document.querySelector('.cart');
    const button = document.querySelector('.empty-cart');
    
    totalPrice.className = 'total-price';
    const descricaoProdutos = document.querySelectorAll('.cart__item');
  
    let total = 0;
   
    descricaoProdutos.forEach((r) => { 
      const price = r.innerHTML.split('$', 2)[1]; 
    total += Number(price);
    });
  
    totalPrice.innerText = total;
    console.log(total);
    (section.insertBefore(totalPrice, button));
   }
const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', (event) => {
    cartItemClickListener(event);
    calculaCarrinhho();
  });
  return li;
};
  
const addElementsOlCartItems = async (event) => {
  const OlCartItems = document.querySelector('.cart__items');
  const item = event.target.parentNode;
  const sku = getSkuFromProductItem(item);
 mensagem(true);
  const { title, price } = await fetchItem(sku);
  mensagem(false);
  const li = createCartItemElement({ sku, name: title, salePrice: price });
  OlCartItems.appendChild(li);
   const e = JSON.parse(getSavedCartItems()) || [];
   const arr = [...e, li.innerHTML];
   saveCartItems(JSON.stringify(arr));
   calculaCarrinhho();
   };
   
 function addGetstorege() {
  const OlCartItems = document.querySelector('.cart__items');
  const item = JSON.parse(getSavedCartItems()) || [];
  for (let i = 0; i < item.length; i += 1) {
    const li = document.createElement('li');
    li.className = 'cart__item';
    li.innerHTML = item[i];
    (OlCartItems.appendChild(li));
    console.log(li);
    }
 }
 function buttonRemmove() {
  const buttons = document.querySelectorAll('.cart__item');
  buttons.forEach((button) => {
   button
     .addEventListener('click', cartItemClickListener);
  });
}

 async function buttonAdd() {
  const buttons = document.querySelectorAll('.item__add');
  buttons.forEach((button) => {
   button
     .addEventListener('click', (event) => { 
       addElementsOlCartItems(event); 
    });
  });
 }
function buttonClearAll() {
  const ol = document.getElementsByClassName('cart__items')[0];
  const lis = document.getElementsByClassName('cart__item');
  const buttonClear = document.querySelector('.empty-cart');
    buttonClear.addEventListener('click', () => {
    Array.from(lis).forEach((clean) => clean.remove());
    localStorage.removeItem('cartItems');
    calculaCarrinhho();
    console.log(ol);
  });
}
window.onload = async () => {
  calculaCarrinhho();
  await addChildsSectionItems();
  await buttonAdd();
  addGetstorege();
  buttonRemmove();
  buttonClearAll();
   };
