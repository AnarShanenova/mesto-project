import {cardTemplate, imgBigSize, imgPopupCaption, bigImgPopup} from './constans.js';
import {openPopup} from './modals.js'

// Функция создания карточки
function createCard (link, name) {  
    const cardElement = cardTemplate.cloneNode(true);
    const cardImg = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const likeButton = cardElement.querySelector(".card__button-like");
    const deleteButton = cardElement.querySelector(".card__button-delete");
    
    cardImg.src = link;
    cardTitle.textContent = name;
    cardImg.alt = name;    
    
    // Кнопка "Нравится"    
    likeButton.addEventListener('click', function (evt) {
      evt.target.classList.toggle('card__button-like_active');
    });  

    // Кнопка "Удалить карточку"   
    deleteButton.addEventListener('click', function (evt) {
      evt.target.closest('.card').remove(cardElement);
    });

    // Открытие фото в полный размер  
    cardImg.addEventListener('click',  function () {    
      imgBigSize.src = link;
      imgBigSize.alt = name;
      imgPopupCaption.textContent = name;
      openPopup(bigImgPopup);
    });
  
    return cardElement;
  }
  
  //Функция добавления карточки в контейнер
  function renderCard(card, container) {
    container.prepend(card);
  }
  export {
      createCard,
      renderCard
  }