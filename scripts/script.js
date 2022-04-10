const nameEditPopup = document.querySelector("#nameEditPopup");
const photoAddPopup = document.querySelector("#addPhotoPopup");

// Функция закрытия для всех попап-окон
function closePopup(popup) {
  popup.classList.remove("popup_opened");  
};

// Закрытие попапов крестик-кнопкой 
const сloseButton = document.querySelectorAll(".popup__close-btn");
сloseButton.forEach(function(button) {
  button.addEventListener('click', function (e) {
    closePopup(e.target.closest('.popup'));
  });
});

// Функция открытия для всех попап-окон
function openPopup(popup) {
  popup.classList.add("popup_opened");  
};

// Кнопка открытия окна редактирования профиля
const nameEditBtn = document.querySelector(".profile__name-edit-button");

nameEditBtn.addEventListener("click", function () {
  openPopup(nameEditPopup);
});

// Кнопка открытия окна добавления фото
const photoAddBtn = document.querySelector(".profile__add-button");
photoAddBtn.addEventListener("click", function () {
  photoTitleInput.value = '';
  linkInput.value = '';
  openPopup(photoAddPopup);
});

// Редактирование профиля
const formElement = document.querySelector('#editForm');
const nameInput = formElement.querySelector('#username');
const jobInput = formElement.querySelector('#userJob');

function formSubmitHandler (evt) {
  evt.preventDefault(); 
document.querySelector('.profile__name').textContent = nameInput.value;
document.querySelector('.profile__description').textContent = jobInput.value; 
closePopup(nameEditPopup);
}
formElement.addEventListener('submit', formSubmitHandler);

// Добавление пользователем фотографий
const photoForm = document.querySelector('#photoAddForm');
const photoTitleInput = document.querySelector('#photoTitle');
const linkInput = document.querySelector('#photoLink');

photoForm.addEventListener('submit', function(evt) {
  evt.preventDefault();
  const card = createCard(linkInput.value, photoTitleInput.value);
  renderCard(card, cardList);
  closePopup(photoAddPopup);
});
// Массив изображений карточек
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
  ];


// Переменные для карточек
const cardList = document.querySelector('.elements__container');
const cardTemplate = document.querySelector('.card-template').content;
const cardImg = cardTemplate.querySelector('.card__image');
const cardTitle = cardTemplate.querySelector('.card__title');

// Переменные для больших картинок
const bigImgPopup = document.querySelector('#bigImgPopup');
const imgBigSize = document.querySelector('.popup__image');
const imgPopupCaption = document.querySelector('.popup__image-name');

// Функция создания карточки
function createCard (link, name) {  
  cardImg.src = link;
  cardTitle.textContent = name;
  cardImg.alt = name;
  
  const cardElement = cardTemplate.cloneNode(true);
  // Кнопка "Нравится"
  cardElement.querySelector('.card__button-like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__button-like_active');
  });  
  // Кнопка "Удалить карточку"
  cardElement.querySelector('.card__button-delete').addEventListener('click', function (evt) {
    evt.target.closest('.card').remove(cardElement);
  });
  // Открытие фото в полный размер
  cardElement.querySelector('.card__image').addEventListener('click',  function () {    
    imgBigSize.src = link;
    imgBigSize.alt = name;
    imgPopupCaption.textContent = name;
    openPopup(bigImgPopup);
  });

  return cardElement;
};

//Функция добавления карточки в контейнер
function renderCard(card, container) {
  container.prepend(card);
};

//Вывод карточек по умолчанию
initialCards.forEach(function(element) {
  const card = createCard(element.link, element.name);
  renderCard(card, cardList);
});

