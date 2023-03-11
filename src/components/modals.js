import {
  linkInput, 
  photoTitleInput, 
  cardsContainer, 
  photoAddPopup, 
  photoForm, 
  avatarEditForm,
  avatarInput,
  avatarPic,
  avatarEditPopup,
  nameEditForm,
  nameInput,
  jobInput,
  userName,
  userJob,
  nameEditPopup
} from './constans.js';
import {config} from '../index.js';
import {closePopup, renderLoading} from './utils';
import {createCard} from './card.js';
import {updateUserAvatar, updateUserInf, addCard} from './api.js';

// Обработчик для обновления фото-аватара пользователя
function handleEditAvatarForm() {  
  renderLoading(avatarEditForm, config.submitButtonSelector, true);   
  return updateUserAvatar(avatarInput.value)
    .then((res) => {
      avatarPic.src = res.avatar;
      closePopup(avatarEditPopup);
    })
    .catch((err) => {
      console.log(err);
    })   
}

// Обработчик для редактирования информации о пользователе
function handleProfileFormSubmit() {
  renderLoading(nameEditForm, config.submitButtonSelector, true);
  return updateUserInf(nameInput.value, jobInput.value)
    .then((res) => {
      userName.textContent = res.name;
      userJob.textContent = res.about;
      closePopup(nameEditPopup)
    })
    .catch((err) => {
      console.log(err);
    })
}

// Обработчик для добавления новой фото-карточки
function handlePhotoFormSubmit() {
  renderLoading(photoForm, config.submitButtonSelector, true);  
  return addCard(photoTitleInput.value, linkInput.value)
    .then((res) => {
      cardsContainer.prepend(createCard(res.link, res.name, res.likes, res.owner._id, res._id));
      closePopup(photoAddPopup);
    })
    .catch((err) => {
      console.log(err);
    })    
}
// Закрытие модальных окон кнопкой esc
function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}
export {
  handleEditAvatarForm,
  handleProfileFormSubmit,
  handlePhotoFormSubmit,    
  closeByEsc
}