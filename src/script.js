const sectionItems = document.querySelector('.items');
const divMenu = document.querySelector('.div_menu');
const totalPrice = document.createElement('li');
const pMessage = document.createElement('p');

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

const createProductItemElement = ({ sku, name, image, price }) => {
  const section = document.createElement('section');

  section.className = 'item';
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__price', `R$${price}`));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

const addChieldsSectionItems = async (product = 'computador') => {
  const { results } = await (fetchProducts(product));

  results.forEach(({ id, title, thumbnail, price }) => {
    const addItemsInSection = createProductItemElement({ 
      sku: id,
      name: title,
      image: thumbnail,
      price,
    }); 
    sectionItems.appendChild(addItemsInSection);
  });
};

function calculateCart() {
  const section = document.querySelector('.cart');
  const button = document.querySelector('.empty-cart');
    
  totalPrice.className = 'total-price';
  const productsDescription = document.querySelectorAll('.p_cart_item');
  let total = 0;
  productsDescription.forEach((product) => { 
    const price = product.innerHTML.split('$', 2)[1]; 
    total += Number(price);
  });
  totalPrice.innerText = `Total R$ ${total}`;
  (section.insertBefore(totalPrice, button));
}

function messageCartEmpty() {
  const div = document.getElementsByClassName('cart__item');
  const OlCartItems = document.querySelector('.cart__items');
  const section = document.querySelector('.cart');
  divMenu.innerText = div.length;
  if (div.length === 0) {
    pMessage.className = 'p_no_cart_item';
    pMessage.innerText = 'O seu carrinho está vazio';
    section.insertBefore(pMessage, OlCartItems);
  } else {
    pMessage.remove();
  }  
}

const cartItemClickListener = (event) => {
  const div = document.getElementsByClassName('cart__item');
  if (event.path[1].classList[0] !== 'cart__item') return '';
    (event.path[1].remove());
    calculateCart();
    const array = [...div];
    const array2 = [];
    messageCartEmpty();
    array.forEach((item) => array2.push(item.innerHTML));
    console.log(array);
    saveCartItems(JSON.stringify(array2));
};

const createCartItemElement = ({ name, salePrice, thumbnail }) => {
  const div = document.createElement('div');
  const li = document.createElement('li');
  const p = document.createElement('p');

  div.className = 'cart__item';
  p.className = 'p_cart_item';
  p.innerHTML = `R$${salePrice}`;
  li.className = 'li_cart__item';
  li.innerHTML = `${name}`;

  div.appendChild(createProductImageElement(thumbnail));
  div.appendChild(p);
  div.appendChild(li);
  div.addEventListener('click', (event) => {
    cartItemClickListener(event);
    calculateCart();
  });
  return div;
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const OlCartItems = document.querySelector('.cart__items');
const addElementsOlCartItems = async (event) => {
  const item = event.target.parentNode;
  const listProduct = getSkuFromProductItem(item);
  const { title, price, thumbnail } = await fetchItem(listProduct); 
  const createCart = createCartItemElement({ 
    name: title, salePrice: price, thumbnail });
    console.log(OlCartItems);
  OlCartItems.appendChild(createCart);
  messageCartEmpty();
  const saved = JSON.parse(getSavedCartItems()) || [];
  const array = [...saved, createCart.innerHTML];
  saveCartItems(JSON.stringify(array));
  calculateCart();
};
   
function addGetstore() {
  // const OlCartItems = document.querySelector('.cart__items');
  const item = JSON.parse(getSavedCartItems()) || [];

  for (let i = 0; i < item.length; i += 1) {
    const div = document.createElement('div');
    div.className = 'cart__item';
    div.innerHTML = item[i];
    (OlCartItems.appendChild(div));
  }
  calculateCart();
}

function removeDivCart() {
  const div = document.querySelectorAll('.cart__item');
  div.forEach((divCart) => {
    divCart.addEventListener('click', cartItemClickListener);
  });
}

function querySelectAll(itemId) {
  return document.querySelectorAll(itemId);
}

async function buttonAdd() {
  const btn = querySelectAll('.item__add');

  btn.forEach((button) => {
    button.addEventListener('click', (event) => { 
      console.log(event);
      addElementsOlCartItems(event); 
    });
  });
}

function buttonClearAll() {
  const lis = document.getElementsByClassName('cart__item');
  const buttonClear = document.querySelector('.empty-cart');
 
    buttonClear.addEventListener('click', () => {
    Array.from(lis).forEach((clean) => clean.remove());
    localStorage.removeItem('cartItems');
    messageCartEmpty();
    calculateCart();
  });
}

async function buttonSearch() {
  const inputSearch = document.querySelector('.input_search');
  const Search = document.querySelector('.button_search');

  Search.addEventListener('click', async () => {
    sectionItems.innerHTML = '';
    await addChieldsSectionItems(inputSearch.value);
    inputSearch.value = '';
    await buttonAdd();
  });  

  inputSearch.addEventListener('keypress', async (event) => {
    if (event.key !== 'Enter') return '';
    sectionItems.innerHTML = '';
    await addChieldsSectionItems(inputSearch.value);
    await buttonAdd();
    inputSearch.value = '';
  });  
}

function btnMenuClick() {
  const btnMenu = document.querySelector('.btn_menu');
  const head = document.querySelector('.container-cartTitle'); 
  const section = document.querySelector('.cart');

  btnMenu.addEventListener('click', () => {
    console.log(section);
   if (section.classList[1] === 'close') {
     console.log(head.classList.remove('close'));
     console.log(btnMenu.classList.remove('close'));
     console.log(section.classList.remove('close'));  
   } else {
    console.log(head.classList.toggle('close'));
    console.log(btnMenu.classList.toggle('close'));
    console.log(section.classList.toggle('close'));  
   }
  });
}

window.onload = async () => {
  calculateCart();
  await addChieldsSectionItems();
  await buttonAdd();
  await buttonSearch();
  btnMenuClick();
  addGetstore();
  removeDivCart();
  buttonClearAll();
  messageCartEmpty();
};
