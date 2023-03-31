import "./pages/index.css";
import enableValidation from "./components/validate.js";
import { /* closePopup, openPopup, */ renderLoading } from "./components/utils.js";
/* import { createCard } from "./components/card.js"; */
import {
  nameEditBtn,
  nameInput,
  jobInput,
  userName,
  userJob,
  nameEditPopupSelector,
  photoAddBtn,
  photoForm,
  photoAddPopup,
  nameEditForm,
  cardsContainer,
  popupList,
  photoSubmitBtn,
  avatar,
  avatarEditOverlay,
  avatarEditPopup,
  avatarEditForm,
  avatarPic,
  linkInput,
  photoTitleInput,
  avatarInput,
} from "./components/constans.js";
/* import {
  getInitialCards,
  getUserInf,
  updateUserAvatar,
  updateUserInf,
  addCard,
} from "./components/api.js"; */
import Api from "./components/Api.js";
import UserInfo from "./components/UserInfo";
import Section from "./components/Section";
import PopupWithForm from "./components/PopupWithForm";



let myAccount;

const api = new Api({
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-20",
  headers: {
    authorization: "340a2beb-4d1b-4011-9455-07dbc10b8c56",
    "Content-Type": "application/json",
  },
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
  profileEditForm.open();
  profileEditForm.setInputValues(userInfo.getUserInfo());
  
  
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
avatar.addEventListener("click", function () {
  avatarEditForm.reset();
  openPopup(avatarEditPopup);
});

// Кнопка открытия окна редактирования профиля
/* nameEditBtn.addEventListener("click", function () {
  nameEditForm.reset();
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
  openPopup(nameEditPopup);
}); */

// Кнопка открытия окна добавления фото
photoAddBtn.addEventListener("click", function () {
  photoForm.reset();
  photoSubmitBtn.setAttribute("disabled", true);
  photoSubmitBtn.classList.add("popup__button_disabled");
  openPopup(photoAddPopup);
});

// Обработчик для обновления фото-аватара пользователя
function handleEditAvatarForm() {
  renderLoading(avatarEditForm, config.submitButtonSelector, true);
  return updateUserAvatar(avatarInput.value)
    .then((res) => {
      avatarPic.src = res.avatar;
      closePopup(avatarEditPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(avatarEditForm, config.submitButtonSelector, false);
    });
}

// Обработчик для редактирования информации о пользователе
/* function handleProfileFormSubmit() {
  renderLoading(nameEditForm, config.submitButtonSelector, true);
  return updateUserInf(nameInput.value, jobInput.value)
    .then((res) => {
      userName.textContent = res.name;
      userJob.textContent = res.about;
      closePopup(nameEditPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(nameEditForm, config.submitButtonSelector, false);
    });
} */

// Обработчик для добавления новой фото-карточки
function handlePhotoFormSubmit() {
  renderLoading(photoForm, config.submitButtonSelector, true);
  return addCard(photoTitleInput.value, linkInput.value)
    .then((res) => {
      cardsContainer.prepend(
        createCard(res.link, res.name, res.likes, res.owner._id, res._id)
      );
      closePopup(photoAddPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(photoForm, config.submitButtonSelector, false);
    });
}

// Редактирование аватара пользователя
avatarEditForm.addEventListener("submit", handleEditAvatarForm);

// Редактирование профиля
/* nameEditForm.addEventListener("submit", handleProfileFormSubmit);
 */
// Добавление пользователем фотографий
photoForm.addEventListener("submit", handlePhotoFormSubmit);

// Закрытие попапов крестиком или кликом по overlay
/* popupList.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__close-btn")) {
      closePopup(popup);
    }
  });
}); */

// Live-validation
enableValidation(config);

export { myAccount };
