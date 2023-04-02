import './pages/index.css';
import enableValidation from './components/validate.js';
import {closePopup, openPopup, renderLoading} from './components/utils.js';
import Card from './components/Card.js';
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

  // popupList,
  popupObjects,
  nameEditPopupObject,
  photoAddPopupObject,
  avatarEditPopupObject,
  bigImgPopupObject,

  photoSubmitBtn,
  avatar,
  avatarEditOverlay,
  avatarEditPopup,
  avatarEditForm,
  avatarPic,
  linkInput, 
  photoTitleInput, 
  avatarInput 
} from './components/constans.js';
import {getInitialCards, getUserInf, updateUserAvatar, updateUserInf, addCard} from './components/api.js';

let myAccount;

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
  }

Promise.all([getUserInf(), getInitialCards()])
  .then(([users, cards]) => {
    userName.textContent = users.name;
    userJob.textContent = users.about;  
    avatarPic.src = users.avatar;
    myAccount = users._id;
    cards.forEach((card) => {

      const cardObject = new Card({
        link: card.link,
        name: card.name,
        likes: card.likes,
        owner: card.owner._id,
        id: card._id,
        handleCardClick: function () {    
          bigImgPopupObject.open(card.link, card.name);
        }
      }, ".card-template")

      cardsContainer.prepend(cardObject.render())
    });    
  })
  .catch((err) => {
    console.log(err);
  });

// Появление кнопки "редактировать фото пользователя" 
avatar.addEventListener('mouseover', () => {
  avatarEditOverlay.classList.add('profile__avatar-overlay_visible');
})

// Скрытие кнопки "редактировать фото пользователя" 
avatar.addEventListener('mouseout', () => {
  avatarEditOverlay.classList.remove('profile__avatar-overlay_visible');
})

// Кнопка открытия окна редактирования аватара пользователя
avatar.addEventListener("click", function () {
  avatarEditForm.reset();  
  // openPopup(avatarEditPopup);  
  avatarEditPopupObject.open();
})

// Кнопка открытия окна редактирования профиля
nameEditBtn.addEventListener("click", function () {
  nameEditForm.reset();
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;  
  // openPopup(nameEditPopup);
  nameEditPopupObject.open();
});

// Кнопка открытия окна добавления фото
photoAddBtn.addEventListener("click", function () {
  photoForm.reset();
  photoSubmitBtn.setAttribute('disabled', true);
  photoSubmitBtn.classList.add('popup__button_disabled');  
  // openPopup(photoAddPopup);  
  photoAddPopupObject.open();
});

// Обработчик для обновления фото-аватара пользователя
function handleEditAvatarForm() {  
  renderLoading(avatarEditForm, config.submitButtonSelector, true);   
  return updateUserAvatar(avatarInput.value)
    .then((res) => {
      avatarPic.src = res.avatar;
      // closePopup(avatarEditPopup);
      avatarEditPopupObject.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(avatarEditForm, config.submitButtonSelector, false);
    });   
}

// Обработчик для редактирования информации о пользователе
function handleProfileFormSubmit() {
  renderLoading(nameEditForm, config.submitButtonSelector, true);
  return updateUserInf(nameInput.value, jobInput.value)
    .then((res) => {
      userName.textContent = res.name;
      userJob.textContent = res.about;
      // closePopup(nameEditPopup)
      nameEditPopupObject.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(nameEditForm, config.submitButtonSelector, false);
    });
}

// Обработчик для добавления новой фото-карточки
function handlePhotoFormSubmit() {
  renderLoading(photoForm, config.submitButtonSelector, true);  
  return addCard(photoTitleInput.value, linkInput.value)
    .then((res) => {
      const cardObject = new Card({
        link: res.link,
        name: res.name,
        likes: res.likes,
        owner: res.owner._id,
        id: res._id,
        handleCardClick: function () {    
          bigImgPopupObject.open(res.link, res.name);
        }
      }, ".card-template")

      cardsContainer.prepend(cardObject.render())
      // closePopup(photoAddPopup);
      photoAddPopupObject.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(photoForm, config.submitButtonSelector, false);
    });    
}

// Редактирование аватара пользователя
avatarEditForm.addEventListener('submit', handleEditAvatarForm);

// Редактирование профиля
nameEditForm.addEventListener('submit', handleProfileFormSubmit);

// Добавление пользователем фотографий
photoForm.addEventListener('submit', handlePhotoFormSubmit);

// Закрытие попапов крестиком или кликом по overlay
// popupList.forEach((popup) => {
//   popup.addEventListener('mousedown', (evt) => {
//       if (evt.target.classList.contains('popup_opened')) {
//           closePopup(popup)
//       }
//       if (evt.target.classList.contains('popup__close-btn')) {
//         closePopup(popup)
//       }
//   })
// })
popupObjects.forEach((popup) => {
  popup.setEventListeners()
})

// Live-validation 
enableValidation(config); 

export {
  myAccount
}
