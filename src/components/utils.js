
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
