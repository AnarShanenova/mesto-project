import './pages/index.css';
import enableValidation from './components/validate.js';
import {handleEditAvatarForm, handleProfileFormSubmit, handlePhotoFormSubmit} from './components/modals.js';
import {closePopup, openPopup, renderLoading} from './components/utils.js';
import {createCard} from './components/card.js';
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
  photoSubmitBtn,
  avatar,
  avatarEditOverlay,
  avatarEditBtn,
  avatarEditPopup,
  avatarEditForm,
  avatarPic  
} from './components/constans.js';
import {getInitialCards, getUserInf} from './components/api.js';

let myAccount;

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
  }

getInitialCards()
  .then((result) => {
    console.log(result)
  })
  .catch((err) => {
    console.log(err);
  }); 

Promise.all([getUserInf(), getInitialCards()])
  .then(([users, cards]) => {
    userName.textContent = users.name;
    userJob.textContent = users.about;  
    avatarPic.src = users.avatar;
    myAccount = users._id;
    cards.forEach((card) => {
      cardsContainer.prepend(createCard(card.link, card.name, card.likes, card.owner._id, card._id))
    });    
  })
  .catch((err) => {
    console.log(err);
  });

// Появление кнопки "редактировать фото пользователя" 
avatar.addEventListener('mouseover', () => {
  avatarEditOverlay.style.visibility = "visible";
  avatarEditOverlay.style.opacity = "1"
})

// Скрытие кнопки "редактировать фото пользователя" 
avatar.addEventListener('mouseout', () => {
  avatarEditOverlay.style.visibility = "hidden";
  avatarEditOverlay.style.opacity = "0"
})

// Кнопка открытия окна редактирования аватара пользователя
avatarEditBtn.addEventListener("click", function () {
  avatarEditForm.reset();
  renderLoading(avatarEditForm, config.submitButtonSelector, false);
  openPopup(avatarEditPopup);  
})

// Кнопка открытия окна редактирования профиля
nameEditBtn.addEventListener("click", function () {
  nameEditForm.reset();
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
  renderLoading(nameEditForm, config.submitButtonSelector, false);
  openPopup(nameEditPopup);
});

// Кнопка открытия окна добавления фото
photoAddBtn.addEventListener("click", function () {
  photoForm.reset();
  photoSubmitBtn.setAttribute('disabled', true);
  photoSubmitBtn.classList.add('popup__button_disabled');
  renderLoading(photoAddPopup, config.submitButtonSelector, false);
  openPopup(photoAddPopup);  
});

// Редактирование аватара пользователя
avatarEditForm.addEventListener('submit', handleEditAvatarForm);

// Редактирование профиля
nameEditForm.addEventListener('submit', handleProfileFormSubmit);

// Добавление пользователем фотографий
photoForm.addEventListener('submit', handlePhotoFormSubmit);

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

// Live-validation 
enableValidation(config); 

export {
  myAccount, 
  config}