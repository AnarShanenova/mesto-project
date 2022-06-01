import {userName, userJob, nameInput, jobInput, nameEditPopup, linkInput, photoTitleInput, cardsContainer, photoAddPopup} from './constans.js';
import {closePopup} from './utils';
import {renderCard, createCard} from './card.js';

// Редактирование профиля
function handleProfileFormSubmit() {
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
  closePopup(nameEditPopup);
}
//Добавление пользователем фотографий
function handlePhotoFormSubmit() {
  const card = createCard(linkInput.value, photoTitleInput.value);
  renderCard(card, cardsContainer);
  closePopup(photoAddPopup);
}
// Закрытие модальных окон кнопкой esc
function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }

}
export {
  handleProfileFormSubmit,
  handlePhotoFormSubmit,
  closeByEsc
}