import {cardTemplate, imgBigSize, imgPopupCaption, bigImgPopup} from './constans.js';
import {openPopup} from './utils.js'
import {myAccount} from '../index.js'
import {putLike, removeLike, deleteCard} from './api.js'

// Функция создания карточки
function createCard (link, name, likes, owner, id) {  
    const cardElement = cardTemplate.cloneNode(true);
    const cardImg = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const likeButton = cardElement.querySelector(".card__button-like");
    const deleteButton = cardElement.querySelector(".card__button-delete");
    const likesNumber = cardElement.querySelector('.card__like-number');

    cardImg.src = link;
    cardTitle.textContent = name;
    cardImg.alt = name;    
    likesNumber.textContent = likes.length;

    // Кнопка "Лайк"    
    likeButton.addEventListener('click', function(evt) {
      if (!evt.target.classList.contains('card__button-like_active')) {
        putLike(id)
          .then((res) => {
            likesNumber.textContent = res.likes.length;
            evt.target.classList.add('card__button-like_active');
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        removeLike(id)
          .then((res) => {
            likesNumber.textContent = res.likes.length;
            evt.target.classList.remove('card__button-like_active');
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });

    likes.forEach((user) => {
      if (user._id === myAccount) {
        likeButton.classList.add('card__button-like_active');
      }
    })   

    // Кнопка "Удалить фото-карточку"   
    deleteButton.addEventListener('click', function (evt) {
      deleteCard(id)
      .then(() => {
        evt.target.closest('.card').remove(cardElement);
      })
      .catch((err) => {
        console.log(err);
      })      
    }); 
    
    if (owner !== myAccount) {
      deleteButton.classList.add('card__button-delete_disabled');
    }

    // Открытие фото в полный размер  
    cardImg.addEventListener('click',  function () {    
      imgBigSize.src = link;
      imgBigSize.alt = name;
      imgPopupCaption.textContent = name;
      openPopup(bigImgPopup);
    });
  
    return cardElement;
  }
  
  // Функция добавления карточки в контейнер
  function renderCard(card, container) {
    container.prepend(card);
  }
  export {
      createCard,
      renderCard
  }