import {closeByEsc} from './modals.js';

// // Функция закрытия для всех попап-окон
// function closePopup(popup) {
//   popup.classList.remove("popup_opened");
//   document.removeEventListener('keydown', closeByEsc);     
// };

// // Функция открытия для всех попап-окон
// function openPopup(popup) {
//   popup.classList.add("popup_opened");
//   document.addEventListener('keydown', closeByEsc);
// };

// Функция изменения текста кнопки при загрузке
function renderLoading(popup, submitButtonSelector, isLoading) {
  const button = popup.querySelector(submitButtonSelector);
  if (isLoading) {
    button.textContent = 'Сохранение...'
  }
  else {
    button.textContent = 'Сохранить'
  }
}

export {
  // closePopup,
  // openPopup,
  renderLoading  
}
