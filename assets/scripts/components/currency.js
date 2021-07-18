// Currency

/**
 * Фильтрация необходимых валют
 * @param data
 */

const filterWallet = (data) => {
  // Массив валют котрые нам нужны, может увеличиваться или уменьшаться
  const wallet = ['USD', 'EUR', 'GBP'];
  let currency = {};

  Object.keys(data).forEach((key) => {
    if (wallet.includes(key)) {
      currency[key] = data[key];
    }
  });

  return currency;
}

/**
 * Отображение данных в виджете валют
 * @param data
 */

const displayCurrency = (data) => {
  const currencyList = document.querySelector('.currency__list');
  const currency = filterWallet(data);
  let wallets = [];

  for (let key in currency) {
    wallets.push(templateCurrency(currency[key]));
  }

  currencyList.insertAdjacentHTML('beforeend', wallets.join(''));
}

/**
 * Шаблон для отображения каждой валюты
 * @returns {string}
 */

const templateCurrency = (wallet) => {
  let previous = wallet.Previous - wallet.Value;
  const isSuccess = previous > 0;
  const displayAction = isSuccess ? 'currency__display--success' : 'currency__display--danger';

  if (!isSuccess) {
    previous = previous.toString();
    previous = +previous.slice(1, previous.length);
  }

  // 4 символа после запятой
  previous = previous.toFixed(4).replace('.',',');

  return `<li class="currency__display ${ displayAction }">
            <div class="currency__name">
              <span class="currency__state"></span>
              ${ wallet.CharCode }
            </div>
            <div class="currency__number">
              <span class="currency__previous">${ previous }</span>
              ${ wallet.Value }
            </div>
          </li>`;
}

/**
 * Получение данных и передачи их для отображения
 */

const getDataCurrency = () => {
  fetch('https://www.cbr-xml-daily.ru/daily_json.js')
    .then(res => res.json())
    .then((data) => {
      displayCurrency(data.Valute);
    })
    .catch((err) => {
      console.warn(err,'Ошибка в запросе!!! (getDataCurrency)');
    })
}

// Если делать preloader заводим handleCurrency()
document.addEventListener('DOMContentLoaded', () => {
  getDataCurrency();
});
