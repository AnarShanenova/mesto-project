export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }
  // открытие попапа
  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener('keydown', (evt) => {
      this._handleEscClose(evt)
    });
  }
  // закрытие попапа
  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener('keydown', (evt) => {
      this._handleEscClose(evt)
    });
  }
  // логика закрытия попапа клавишей Esc
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  } 
  // добавление слушателя клика иконке закрытия попапа +
  // логика закрытия модального окна при клике 
  // на затемнённую область вокруг формы
  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this.close();
      }
      if (evt.target.classList.contains('popup__close-btn')) {
        this.close();
      }
  })
  }
}


