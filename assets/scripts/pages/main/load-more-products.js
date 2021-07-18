// Load more Products

// Заглушка с продуктами (на реальном проекте будет запрос на сервак)
import {products} from '../../../data/products.js';

const productsWrapper = document.querySelector('.products');
const loadMoreButton = document.querySelector('.load-more-products');

const templateStars = (stars, count) => {
  const svgId = stars >= count ? 'star-filled' : 'star';

  return `<li class="star">
            <svg width="16" height="16">
              <use xlink:href="../../images/sprite.svg#${svgId}"></use>
            </svg>
          </li>`;
}

const templateProduct = (product) => {
  const starList = [];

  for (let i = 1; i <= 5; i++) {
    starList.push(templateStars(product.stars, i));
  }

  return `<li class="product">
    <a class="product__image-wrapper" href="${product.srcLink}">
      <img class="product__image" src="${product.scrImage}" alt="Alt">
    </a>
    <div class="rating">
      <ul class="stars">
        ${starList.join('')}
      </ul>
      <div class="rating__text">${product.ratingText} отзыва</div>
    </div>
    <h2 class="product__title">${product.title}</h2>
    <div class="product__controls">
      <div class="product__price">
        <span>${product.priceSale} ₽</span>
          ${product.price} ₽
      </div>
      <button class="product__button button button--danger button--md" type="button" aria-label="Add product cart">
        <svg width="20" height="20">
          <use xlink:href="../../images/sprite.svg#cart-light"></use>
        </svg>
      </button>
    </div>
  </li>`;
}

// возвращает нужно количество продуктов
const prepareProducts = () => {
  const LOAD_PRODUCT_COUNT = 6; // Кол-во карточек по умолчанию
  const productLength = productsWrapper.querySelectorAll('.product').length;
  let page = +productsWrapper.dataset.page;
  let partialProducts = [];
  let start = 0;

  if (page > 1) {
    start = productLength - LOAD_PRODUCT_COUNT;
  }

  partialProducts = products.slice(start, start + LOAD_PRODUCT_COUNT);

  page++;
  productsWrapper.setAttribute('data-page', page.toString());

  // Прячем кнопку, чтобы не игрались
  if (!partialProducts.length || partialProducts.length < LOAD_PRODUCT_COUNT) {
    loadMoreButton.classList.add('hidden');
  }

  return partialProducts;
}

// Встравивание продуктов в конце списка
const displayProducts = () => {
  const nextProducts = prepareProducts();
  let productsCollection = [];

  nextProducts.forEach((product) => {
    productsCollection.push(templateProduct(product));
  });

  productsWrapper.insertAdjacentHTML('beforeend', productsCollection.join(''));
}

// Обработка
const handleLoadProducts = () => {
  // Включаем прелоадер loading(true);
  // Отключаем кнопку чтобы не баловались
  displayProducts();
  // Включаем кнопку
  // Отключаем прелоадер loading(false);
}

document.addEventListener('DOMContentLoaded', () => {
  loadMoreButton.addEventListener('click', handleLoadProducts);
});
