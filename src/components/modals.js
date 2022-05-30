// Функция закрытия для всех попап-окон
function closePopup(popup) {
    popup.classList.remove("popup_opened");  
  };

  // Функция открытия для всех попап-окон
function openPopup(popup) {
    popup.classList.add("popup_opened");  
  };

export {
    closePopup,
    openPopup
}