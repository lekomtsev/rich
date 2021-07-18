// Modal window

export default class pmModal {
  constructor(selector, options) {
    this.selector = selector;

    // Конфиги по умолчанию
    const defaultConfig = {
      closeOnButton: 'modal-close',
      // closeOnEsc: true,

      // Дополнительно можно описать какие-либо методы, например которые ниже:
      // beforeOpen() {} || afterOpen() {}
    }

    // Сливаем дефолтный конфиг и тот котрый подали снаружи
    this.config = Object.assign(defaultConfig, options);

    // Если существуте селектор инициализуруемся
    if(this.selector){
      this.init();
    }
  }

  init() {
    this.isOpened = false;
    document.addEventListener('click', this.handleEvents.bind(this));
  }

  handleEvents(evt) {
    const control = evt.target;

    if (control.classList.contains('modal-open') && !this.isOpened) {
      this.open();
      return;
    }

    if ((control.classList.contains(this.config.closeOnButton) && this.isOpened)
        || !control.closest('.modal')
    ) {
      this.close();
    }
  }

  open() {
    if (this.isOpened) {
      return;
    }

    document.querySelector(this.selector).classList.add('modal-show');
    document.body.classList.add('no-scroll');

    // this.config.beforeOpen(this); - пример где можно описать колбек для доп методов
    this.isOpened = true;
  }

  close() {
    if (!this.isOpened) {
      return;
    }

    document.querySelector(this.selector).classList.remove('modal-show');
    document.body.classList.remove('no-scroll');

    this.isOpened = false;
  }
}
