const sectionContainer = document.querySelector('.container');
const sectionItems = document.querySelector('.items');
const divMessage = document.createElement('div');
const totalPrice = document.createElement('li');

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
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

function message(param) {
  if (param === true) {
    divMessage.className = 'loading';
    divMessage.innerText = 'carregando...';
    sectionContainer.insertBefore(divMessage, sectionItems);
  } else {
    divMessage.remove();
  }
}

const addChieldsSectionItems = async (product = 'computador') => {
  message(true);

  const { results } = await (fetchProducts(product));

  message(false);

  results.forEach(({ id, title, thumbnail }) => {
    const addItemsInSection = createProductItemElement({ 
      sku: id,
      name: title,
      image: thumbnail,
    }); 
    sectionItems.appendChild(addItemsInSection);
  });
};

function calculateCart() {
  const section = document.querySelector('.cart');
  const button = document.querySelector('.empty-cart');
    
  totalPrice.className = 'total-price';
  const productsDescription = document.querySelectorAll('.li_cart_item');
  
  let total = 0;
   
  productsDescription.forEach((product) => { 
    const price = product.innerHTML.split('$', 2)[1]; 
    total += Number(price);
  });
  
  totalPrice.innerText = total;
  (section.insertBefore(totalPrice, button));
}

const cartItemClickListener = (event) => {
  const div = document.getElementsByClassName('cart__item');
    (event.path[1].remove());
    calculateCart();
    const array = [...div];
    const array2 = [];

    array.forEach((item) => array2.push(item.innerHTML));
    saveCartItems(JSON.stringify(array2));
};

const createCartItemElement = ({ name, salePrice, thumbnail }) => {
  const div = document.createElement('div');
  const li = document.createElement('li');
  const p = document.createElement('p');

  div.className = 'cart__item';
  p.className = 'li_cart_item';
  li.innerHTML = `${name}`;
  p.innerHTML = `R$${salePrice}`;

  div.appendChild(createProductImageElement(thumbnail));
  div.appendChild(li);
  div.appendChild(p);

  div.addEventListener('click', (event) => {
    cartItemClickListener(event);
    calculateCart();
  });
  return div;
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;
  
const addElementsOlCartItems = async (event) => {
  const OlCartItems = document.querySelector('.cart__items');
  const item = event.target.parentNode;
  const listProduct = getSkuFromProductItem(item);
  const { title, price, thumbnail } = await fetchItem(listProduct);   

  OlCartItems.appendChild(createCartItemElement({ 
    name: title, salePrice: price, thumbnail,
  }));

  const saved = JSON.parse(getSavedCartItems()) || [];
  const array = [...saved, li.innerHTML];
  saveCartItems(JSON.stringify(array));
  calculateCart();
};
   
function addGetstore() {
  const OlCartItems = document.querySelector('.cart__items');
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
    calculateCart();
  });
}

async function buttonSearch() {
  const Search = document.querySelector('.button_search');
  Search.addEventListener('click', async () => {
  const inputSearch = document.querySelector('.input_search').value;
  sectionItems.innerHTML = '';
  await addChieldsSectionItems(inputSearch);
  document.querySelector('.input_search').value = '';
  await buttonAdd();
  });  
}

window.onload = async () => {
  calculateCart();
  await addChieldsSectionItems();
  await buttonAdd();
  await buttonSearch();
  addGetstore();
  removeDivCart();
  buttonClearAll();
};
