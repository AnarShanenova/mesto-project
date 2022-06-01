import {closeByEsc} from './modals.js';
// Функция закрытия для всех попап-окон
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener('keydown', closeByEsc);     
};

  // Функция открытия для всех попап-окон
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener('keydown', closeByEsc);   
};

export {
  closePopup,
  openPopup
}
