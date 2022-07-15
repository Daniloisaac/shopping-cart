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
const addChildsSectionItems = async () => {
  const sectionItems = document.querySelector('.items');
  const { results } = await (fetchProducts('computador'));
    results.forEach(({ id, title, thumbnail }) => {
   const addItemsInSection = createProductItemElement({ sku: id, name: title, image: thumbnail }); 
   sectionItems.appendChild(addItemsInSection);
   });
 };

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const cartItemClickListener = (event) => {
    (event.target.remove());
    const lie = document.getElementsByClassName('cart__item');
    const item = JSON.parse(getSavedCartItems());
    const OlCart = document.getElementsByClassName('cart__items')[0];
    saveCartItems(JSON.stringify([OlCart.innerText]));
  };

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};
const addElementsOlCartItems = async (event) => {
  const OlCartItems = document.querySelector('.cart__items');
  
  const item = event.target.parentNode;
  const sku = getSkuFromProductItem(item);
  const { title, price } = await fetchItem(sku);
  const li = createCartItemElement({ sku, name: title, salePrice: price });

   OlCartItems.appendChild(li);
   
   const e = JSON.parse(getSavedCartItems()) || '';
   const arr = [...e, li.innerHTML];
    saveCartItems(JSON.stringify(arr));
 };
async function buttonAdd() {
 const buttons = document.querySelectorAll('.item__add');
 buttons.forEach((button) => {
  button
    .addEventListener('click', addElementsOlCartItems);
 });
}

function addGetstorege() {
  const OlCartItems = document.querySelector('.cart__items');
  const item = JSON.parse(getSavedCartItems());
  
  for (let i = 0; i < item.length; i += 1) {
    const li = document.createElement('li');
    li.className = 'cart__item';
    li.innerHTML = item[i];
    console.log(OlCartItems.appendChild(li));
    }
 }
 function buttonRemmove() {
  const buttons = document.querySelectorAll('.cart__item');
  buttons.forEach((button) => {
   button
     .addEventListener('click', cartItemClickListener);
  });
}
window.onload = async () => {
  await addChildsSectionItems();
  await buttonAdd();
  addGetstorege();
  buttonRemmove();
  };
