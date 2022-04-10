const nameEditPopup = document.querySelector("#nameEditPopup");
const photoAddPopup = document.querySelector("#addPhotoPopup");

// Функция закрытия для всех попап-окон
function closePopup(popup) {
  popup.classList.remove("popup_opened");  
};

// Закрытие попапов крестик-кнопкой 
const сloseButtons = document.querySelectorAll(".popup__close-btn");
сloseButtons.forEach(function(button) {
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
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
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
const nameInput = formElement.querySelector('#usernameInput');
const jobInput = formElement.querySelector('#userJobInput');
const userName = document.querySelector('.profile__name');
const userJob = document.querySelector('.profile__description');

function formSubmitHandler (evt) {
  evt.preventDefault(); 
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value; 
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
const cardsContainer = document.querySelector('.elements__container');
const cardTemplate = document.querySelector('.card-template').content;


// Переменные для больших картинок
const bigImgPopup = document.querySelector('#bigImgPopup');
const imgBigSize = document.querySelector('.popup__image');
const imgPopupCaption = document.querySelector('.popup__image-name');

// Функция создания карточки
function createCard (link, name) {  
  const cardElement = cardTemplate.cloneNode(true);
  const cardImg = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');

  cardImg.src = link;
  cardTitle.textContent = name;
  cardImg.alt = name;
  
  // Кнопка "Нравится"
  const likeButton = cardElement.querySelector('.card__button-like');
  likeButton.addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__button-like_active');
  });  
  // Кнопка "Удалить карточку"
  const deleteButton = cardElement.querySelector('.card__button-delete');
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
};

//Функция добавления карточки в контейнер
function renderCard(card, container) {
  container.prepend(card);
};

//Вывод карточек по умолчанию
initialCards.forEach(function(element) {
  const card = createCard(element.link, element.name);
  renderCard(card, cardsContainer);
});

