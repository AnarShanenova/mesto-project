import {myAccount} from '../index.js'
import {putLike, removeLike, deleteCard} from './api.js'

export default class Card {
  constructor({ link, name, likes, owner, id, handleCardClick}, selector) {
    this._selector = selector;
    this._link = link;
    this._name = name;
    this._likes = likes;
    this._owner = owner;
    this._id = id;
    this._handleCardClick = handleCardClick;
  }

  _getCard() {
    const cardElement = document
      .querySelector(this._selector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners(likeButton, likesNumber, deleteButton, cardImg, cardElement) {
    const id = this._id;
    const handleCardClick = this._handleCardClick;

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
    // Открытие фото в полный размер  
    cardImg.addEventListener('click',  handleCardClick);
  }

  _isLikedByUser(likeButton) {
    this._likes.forEach((user) => {
      if (user._id === myAccount) {
        likeButton.classList.add('card__button-like_active');
      }
    }) 
  }

  _deleteButtonDisable(deleteButton) {
    if (this._owner !== myAccount) {
      deleteButton.classList.add('card__button-delete_disabled');
    }
  }
  // Метод, который возвращает полностью работоспособный 
  // и наполненный данными элемент карточки
  render() {
    console.log("RENDER");

    const cardElement = this._getCard()
    const cardImg = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const likeButton = cardElement.querySelector(".card__button-like");
    const deleteButton = cardElement.querySelector(".card__button-delete");
    const likesNumber = cardElement.querySelector('.card__like-number');

    cardImg.src = this._link;
    cardTitle.textContent = this._name;
    cardImg.alt = this._name;    
    likesNumber.textContent = this._likes.length;

    this._setEventListeners(likeButton, likesNumber, deleteButton, cardImg, cardElement);
    this._isLikedByUser(likeButton);
    this._deleteButtonDisable(deleteButton);

    return cardElement;
  }
}
