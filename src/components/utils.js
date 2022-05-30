import {userName, userJob, nameInput, jobInput, nameEditPopup, linkInput, photoTitleInput, cardsContainer, photoAddPopup} from './constans.js';
import {closePopup} from './modals.js';
import {renderCard, createCard} from './card.js';

// Редактирование профиля
function nameEditFormSubmitHandler() {
    userName.textContent = nameInput.value;
    userJob.textContent = jobInput.value;
    closePopup(nameEditPopup);
}
//Добавление пользователем фотографий
function photoFormSubmitHandler() {
    const card = createCard(linkInput.value, photoTitleInput.value);
    renderCard(card, cardsContainer);
    closePopup(photoAddPopup);
}

export {
    nameEditFormSubmitHandler,
    photoFormSubmitHandler
}