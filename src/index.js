import './pages/index.css';
import enableValidation from './components/validate.js';
import {initialCards} from './components/initialCards.js';
import {nameEditFormSubmitHandler, photoFormSubmitHandler} from './components/utils.js';
import {closePopup, openPopup} from './components/modals.js';
import {createCard, renderCard} from './components/card.js';
import {
  closeButtons, 
  nameEditBtn, 
  nameInput, 
  jobInput, 
  userName, 
  userJob, 
  nameEditPopup, 
  photoAddBtn,
  photoForm,
  photoAddPopup,
  nameEditForm,
  cardsContainer,
  popupList
} from './components/constans.js';


// Закрытие попапов крестик-кнопкой 
closeButtons.forEach(function(button) {
  button.addEventListener('click', function (e) {
    closePopup(e.target.closest('.popup'));
  });
});

// Кнопка открытия окна редактирования профиля
nameEditBtn.addEventListener("click", function () {
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
  openPopup(nameEditPopup);
});

// Кнопка открытия окна добавления фото
photoAddBtn.addEventListener("click", function () {
  photoForm.reset();
  openPopup(photoAddPopup);
});

// Редактирование профиля
nameEditForm.addEventListener('submit', nameEditFormSubmitHandler);

// Добавление пользователем фотографий
photoForm.addEventListener('submit', photoFormSubmitHandler);

//Вывод карточек по умолчанию
initialCards.forEach(function(element) {
  const card = createCard(element.link, element.name);
  renderCard(card, cardsContainer);
});

//Live-validation 
enableValidation(
  {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
  }
); 

//Close by esc
document.addEventListener('keydown', (e) => {  
  if (e.key === 'Escape') {
    const target = document.querySelector('.popup_opened');
    closePopup(target);
  }
})

//Close by overlay-click
popupList.forEach(popup => {
  popup.addEventListener('click', (e) => {
    if (e.target.classList.contains('popup')) {
      closePopup(popup);
    }
  })
});