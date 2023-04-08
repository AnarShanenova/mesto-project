import "./index.css";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Api from "../components/Api.js";
import UserInfo from "../components/UserInfo";
import Section from "../components/Section";
import PopupWithForm from "../components/PopupWithForm";
import PopupWithImage from "../components/popupwithimage";
import {
  nameEditBtn,
  nameInput,
  jobInput,
  userName,
  userJob,
  photoAddBtn,
  cardsContainer,
  avatar,
  avatarEditOverlay,
  avatarPic,
  nameEditPopupSelector,
  addPhotoPopupSelector,
  avatarEditPopupSelector,
  config,
  nameEditForm,
  photoForm,
  avatarEditForm
} from "../utils/constants.js";

let myAccount;

export const api = new Api({
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-20",
  headers: {
    authorization: "340a2beb-4d1b-4011-9455-07dbc10b8c56",
    "Content-Type": "application/json",
  },
});

const profileEditValidate = new FormValidator (config, nameEditForm);
const editAvatarValidate = new FormValidator(config, photoForm);
const addCardValidate = new FormValidator(config, avatarEditForm);

profileEditValidate.enableValidation();
editAvatarValidate.enableValidation();
addCardValidate.enableValidation();

const cardsList = new Section(
  {
    renderer: (data) => {
      const cardObject = createCard(data);
      cardsList.addItem(cardObject);
    },
  },
  cardsContainer
);

// Получение экземпляра класса для карточек
const createCard = (data) => {
  const card = new Card(
    {
      link: data.link,
      name: data.name,
      likes: data.likes,
      owner: data.owner._id,
      id: data._id,
      handleCardClick: function () {
        bigImgPopupObject.open(data.link, data.name);
      },
    },
    ".card-template",
    myAccount,
    api
  );
  const cardElement = card.render();
  return cardElement;
};

Promise.all([api.getUser(), api.getInitialCards()])
  .then(([users, cards]) => {
    myAccount = users._id;
    userInfo.setUserInfo(users);
    cardsList.renderItems(cards);
  })
  .catch((err) => {
    console.log(err);
  });

// Попап для картинки
const bigImgPopupObject = new PopupWithImage(".popup_big-image");
bigImgPopupObject.setEventListeners();

const userInfo = new UserInfo({ userName, userJob, avatarPic });

// Редактирование профиля
const profileEditForm = new PopupWithForm(nameEditPopupSelector, {
  handleSubmit: (data) => {
    profileEditForm.renderLoading(true, "Сохранение...");
    api
      .updateUserInf(data)
      .then((data) => {
        userInfo.setUserInfo(data);
        profileEditForm.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        profileEditForm.renderLoading(false);
      });
  },
});
profileEditForm.setEventListeners();

nameEditBtn.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.about;
  profileEditForm.open();
});

// Добавление новой карточки
const addCardForm = new PopupWithForm(addPhotoPopupSelector, {
  handleSubmit: (data) => {
    addCardForm.renderLoading(true, "Сохранение...");
    api
      .addCard(data)
      .then((data) => {
        cardsList.addItem(createCard(data));
        addCardForm.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        addCardForm.renderLoading(false);
      });
  },
});
addCardForm.setEventListeners();

photoAddBtn.addEventListener("click", () => {
  addCardForm.open();
});

// Редактирование аватара
const editAvatarForm = new PopupWithForm(avatarEditPopupSelector, {
  handleSubmit: (data) => {
    editAvatarForm.renderLoading(true, "Сохранение...");
    api
      .updateUserAvatar(data)
      .then((data) => {
        userInfo.setUserInfo(data);
        editAvatarForm.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        editAvatarForm.renderLoading(false);
      });
  },
});
editAvatarForm.setEventListeners();

avatar.addEventListener("click", () => {
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

// Live-validation
/* enableValidation(config); */
