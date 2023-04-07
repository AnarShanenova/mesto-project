export default class Card {
  constructor(
    { link, name, likes, owner, id, handleCardClick },
    selector,
    myAccount,
    api
  ) {
    this._selector = selector;
    this._link = link;
    this._name = name;
    this._likes = likes;
    this._owner = owner;
    this._id = id;
    this._handleCardClick = handleCardClick;
    this._myAccount = myAccount;
    this._api = api;
  }

  _getCard() {
    this._cardElement = document
      .querySelector(this._selector)
      .content.querySelector(".card")
      .cloneNode(true);

    return this._cardElement;
  }

  _setEventListeners() {    
    const handleCardClick = this._handleCardClick;

    // Кнопка "Лайк"
    this._element
      .querySelector(".card__button-like")
      .addEventListener("click", () => {
        this._handleLikeCard();
      });

    // Кнопка "Удалить фото-карточку"
    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteCard();
    });

    // Открытие фото в полный размер
    this._cardImg.addEventListener("click", handleCardClick);
  }

  _handleLikeCard() {
    if (!this._likeButton.classList.contains("card__button-like_active")) {
      this._api
        .putLike(this._id)
        .then((res) => {
          this._likesNumber.textContent = res.likes.length;
          this._likeButton.classList.add("card__button-like_active");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this._api
        .removeLike(this._id)
        .then((res) => {
          this._likesNumber.textContent = res.likes.length;
          this._likeButton.classList.remove("card__button-like_active");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  _handleDeleteCard() {
    this._api
      .deleteCard(this._id)
      .then(() => {
        this._element.remove();
      })
      .catch((err) => {
        console.log(err);
      });
  }

    _isLikedByUser() {
    this._likes.forEach((user) => {
      if (user._id === this._myAccount) {
        this._likeButton.classList.add("card__button-like_active");
      }
    });
  }

  _deleteButtonDisable() {
    if (this._owner !== this._myAccount) {
      this._deleteButton.classList.add("card__button-delete_disabled");
    }
  }

  // Метод, который возвращает полностью работоспособный
  // и наполненный данными элемент карточки
  render() {
    this._element = this._getCard();
    this._cardImg = this._element.querySelector(".card__image");
    this._cardTitle = this._element.querySelector(".card__title");
    this._likeButton = this._element.querySelector(".card__button-like");
    this._deleteButton = this._element.querySelector(".card__button-delete");
    this._likesNumber = this._element.querySelector(".card__like-number");

    this._cardImg.src = this._link;
    this._cardTitle.textContent = this._name;
    this._cardImg.alt = this._name;
    this._likesNumber.textContent = this._likes.length;

   /*  if (this._likes.some((like) => like._id === this._owner)) {
      this._likeButton.classList.add("card__button-like_active");
    } */

    this._deleteButtonDisable();
    this._isLikedByUser();
    this._setEventListeners();
    return this._element;
  }
}
