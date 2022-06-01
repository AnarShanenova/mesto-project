import './pages/index.css';
import enableValidation from './components/validate.js';
import {initialCards} from './components/initialCards.js';
import {handleProfileFormSubmit, handlePhotoFormSubmit} from './components/modals.js';
import {closePopup, openPopup} from './components/utils.js';
import {createCard, renderCard} from './components/card.js';
import {
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
  popupList,
  photoSubmitBtn
} from './components/constans.js';

// Закрытие попапов крестиком или кликом по overlay
popupList.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
          closePopup(popup)
      }
      if (evt.target.classList.contains('popup__close-btn')) {
        closePopup(popup)
      }
  })
})

// Кнопка открытия окна редактирования профиля
nameEditBtn.addEventListener("click", function () {
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
  openPopup(nameEditPopup);
});

// Кнопка открытия окна добавления фото
photoAddBtn.addEventListener("click", function () {
  photoForm.reset();
  photoSubmitBtn.setAttribute('disabled', true);
  photoSubmitBtn.classList.add('popup__button_disabled');
  openPopup(photoAddPopup);  
});

// Редактирование профиля
nameEditForm.addEventListener('submit', handleProfileFormSubmit);

// Добавление пользователем фотографий
photoForm.addEventListener('submit', handlePhotoFormSubmit);

// Вывод карточек по умолчанию
initialCards.forEach(function(element) {
  const card = createCard(element.link, element.name);
  renderCard(card, cardsContainer);
});

// Live-validation 
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
