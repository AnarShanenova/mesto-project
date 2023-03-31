import Popup from "./Popup";
 
export default class PopupWithForm extends Popup {
 constructor (popupSelector, {handleSubmit}) {
   super(popupSelector);
   this._form = this._popup.querySelector('.popup__form');
   this._inputsList = this._form.querySelectorAll('.popup__input');
   this._submitButton = this._form.querySelector('.popup__button');
   this._handleSubmit = handleSubmit;
 
 }
 
 _getInputValues() {
   this._data = {};
   this._inputsList.forEach(input => {
   this._data[input.name] = input.value;
   })
  
   return this._data;
 }

 renderLoading(isLoading) {
  if (isLoading) {
    this._submitButton.textContent = 'Сохранение...';
  } else {
    this._submitButton.textContent = 'Сохранить';
  }
}
 
 setEventListeners() {
   super.setEventListeners();
   this._form.addEventListener('submit', (evt) => {
     evt.preventDefault();
     this._handleSubmit(this._getInputValues());
   })
 }

 setInputValues(getData) {
  this._inputsList.forEach((input) => {
      input.value = getData[input.name];
  })
}
 
 close() {
   this._form.reset();
   super.close();
 }
}