import './pages/index.css';
import enableValidation from './components/FormValidator.js';
import {renderLoading} from './components/utils.js';
import Card from './components/Card.js';
import Popup from './components/popup';
import PopupWithImage from './components/popupwithimage';
import {
  nameEditBtn, 
  nameInput, 
  jobInput, 
  userName, 
  userJob,  
  photoAddBtn,
  photoForm,
  nameEditForm,
  cardsContainer,
  popupList,
  photoSubmitBtn,
  avatar,
  avatarEditOverlay,
  avatarEditForm,
  avatarPic,
  linkInput,
  photoTitleInput,
  avatarInput  
} from "./components/constans.js";
import Api from "./components/Api.js";
import UserInfo from "./components/UserInfo";
import Section from "./components/Section";
import PopupWithForm from "./components/PopupWithForm";


let myAccount;

const api = new Api({
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-20",
  headers: {
    authorization: "340a2beb-4d1b-4011-9455-07dbc10b8c56",
    "Content-Type": "application/json"
  }
});

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

/* Promise.all([getUser(), getInitialCards()])
const popupObjects = popupList.map(element => {
  let popupId = element.id;
  let popup = new Popup(popupId);
  return popup
});

const nameEditPopupObject = new Popup("nameEditPopup");
const photoAddPopupObject = new Popup("addPhotoPopup");
const avatarEditPopupObject = new Popup("avatarEditPopup");  
const bigImgPopupObject = new PopupWithImage("bigImgPopup");

Promise.all([getUserInf(), getInitialCards()])
  .then(([users, cards]) => {
    userName.textContent = users.name;
    userJob.textContent = users.about;
    avatarPic.src = users.avatar;
    myAccount = users._id;
    cards.forEach((card) => {
      cardsContainer.prepend(
        createCard(card.link, card.name, card.likes, card.owner._id, card._id)
      );
    });
  })
  .catch((err) => {
    console.log(err);
  }); */

Promise.all([api.getUser(), api.getInitialCards()])
  .then(([users, cards]) => {
    myAccount = users._id;
    userInfo.setUserInfo(users);
    cardsList.renderItems(cards);
    

      const cardObject = new Card({
        link: card.link,
        name: card.name,
        likes: card.likes,
        owner: card.owner._id,
        id: card._id,
        handleCardClick: function () {    
          bigImgPopupObject.open(card.link, card.name);
        }
      }, ".card-template")

      cardsContainer.prepend(cardObject.render())
    });    
  })
  .catch((err) => {
    console.log(err);
  });

const userInfo = new UserInfo({ userName, userJob, avatarPic });

const cardsList = new Section({
  renderer: (data) => {
    cardsList.setItem(createCard(data));
  },
}, cardsContainer);


// Редактирование профиля
const profileEditForm = new PopupWithForm(nameEditPopupSelector, {
  handleSubmit: (data) => {
    profileEditForm.renderLoading(true);
    api.updateUserInf(data)
    .then((data) => {
    userInfo.setUserInfo(data);
    profileEditForm.close();
    })
    .catch((err) => {
      console.log(err)})
    .finally(() => {
      profileEditForm.renderLoading(false);
    });
  }
});
profileEditForm.setEventListeners(); 

nameEditBtn.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.about;  
  profileEditForm.open();  
});

// Добавление новой карточки
const addCardForm = new PopupWithForm(addPhotoPopupSelector, {
  handleSubmit: (data) => {
    addCardForm.renderLoading(true);
    api.addCard(data)
    .then((data) => {
      cardsList.setItem(createCard(data));
      addCardForm.close()})
    .catch((err) => {
      console.log(err)})
    .finally(() => {
      addCardForm.renderLoading(false);
    });
  }
})
addCardForm.setEventListeners();

photoAddBtn.addEventListener('click', () => { 
  addCardForm.open();
});

// Редактирование аватара
const editAvatarForm = new PopupWithForm(avatarEditPopupSelector, {
  handleSubmit: (data) => {
    editAvatarForm.renderLoading(true);    
    api.updateUserAvatar(data)
    .then((data) => {
    userInfo.setUserInfo(data);
    editAvatarForm.close();
    })
    .catch((err) => {
      console.log(err)})
    .finally(() => {
      editAvatarForm.renderLoading(false);
    });
  }
});
editAvatarForm.setEventListeners();

avatar.addEventListener('click', () => {  
  editAvatarForm.open();
});

// Появление кнопки "редактировать фото пользователя"
avatar.addEventListener("mouseover", () => {
  avatarEditOverlay.classList.add("profile__avatar-overlay_visible");
});

// Скрытие кнопки "редактировать фото пользователя"
avatar.addEventListener("mouseout", () => {
  avatarEditOverlay.classList.remove("profile__avatar-overlay_visible");
});

// Кнопка открытия окна редактирования аватара пользователя
/* avatar.addEventListener("click", function () {
  avatarEditForm.reset();
  openPopup(avatarEditPopup);
}); */

// Кнопка открытия окна редактирования профиля
/* nameEditBtn.addEventListener("click", function () {
  nameEditForm.reset();
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
  openPopup(nameEditPopup);
}); */

// Кнопка открытия окна добавления фото
/* photoAddBtn.addEventListener("click", function () {
  photoForm.reset();
  photoSubmitBtn.setAttribute("disabled", true);
  photoSubmitBtn.classList.add("popup__button_disabled");
  openPopup(photoAddPopup);
}); */

// Обработчик для обновления фото-аватара пользователя
/* function handleEditAvatarForm() {
  renderLoading(avatarEditForm, config.submitButtonSelector, true);
  return updateUserAvatar(avatarInput.value)
    .then((res) => {
      avatarPic.src = res.avatar;
      avatarEditPopupObject.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(avatarEditForm, config.submitButtonSelector, false);
    });
} */

// Обработчик для редактирования информации о пользователе
/* function handleProfileFormSubmit() {
  renderLoading(nameEditForm, config.submitButtonSelector, true);
  return updateUserInf(nameInput.value, jobInput.value)
    .then((res) => {
      userName.textContent = res.name;
      userJob.textContent = res.about;
      nameEditPopupObject.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(nameEditForm, config.submitButtonSelector, false);
    });
} */

// Обработчик для добавления новой фото-карточки
/* function handlePhotoFormSubmit() {
  renderLoading(photoForm, config.submitButtonSelector, true);
  return addCard(photoTitleInput.value, linkInput.value)
    .then((res) => {
      const cardObject = new Card({
        link: res.link,
        name: res.name,
        likes: res.likes,
        owner: res.owner._id,
        id: res._id,
        handleCardClick: function () {    
          bigImgPopupObject.open(res.link, res.name);
        }
      }, ".card-template")

      cardsContainer.prepend(cardObject.render())
      photoAddPopupObject.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(photoForm, config.submitButtonSelector, false);
    });
} */

// Редактирование аватара пользователя
/* avatarEditForm.addEventListener("submit", handleEditAvatarForm); */

// Редактирование профиля
/* nameEditForm.addEventListener("submit", handleProfileFormSubmit);
 */
// Добавление пользователем фотографий
/* photoForm.addEventListener("submit", handlePhotoFormSubmit); */

// Закрытие попапов крестиком или кликом по overlay
popupObjects.forEach((popup) => {
  popup.setEventListeners()
})

// Live-validation
enableValidation(config);

export {
  myAccount
}
