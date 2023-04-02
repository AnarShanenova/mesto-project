import Popup from './popup.js';
import PopupWithImage from './popupwithimage.js';

const nameEditPopup = document.querySelector("#nameEditPopup"),
      photoAddPopup = document.querySelector("#addPhotoPopup"),      
      nameEditBtn = document.querySelector(".profile__name-edit-button"),
      photoAddBtn = document.querySelector(".profile__add-button"),
      nameEditForm = document.querySelector("#nameEditForm"),
      nameInput = nameEditForm.querySelector("#usernameInput"),
      jobInput = nameEditForm.querySelector("#userJobInput"),
      userName = document.querySelector(".profile__name"),
      userJob = document.querySelector(".profile__description"),
      photoForm = document.querySelector("#photoAddForm"),
      photoTitleInput = document.querySelector("#photoTitle"),
      linkInput = document.querySelector("#photoLink"),
      cardsContainer = document.querySelector(".elements__container"),
      cardTemplate = document.querySelector(".card-template").content,
      // bigImgPopup = document.querySelector("#bigImgPopup"),
      imgBigSize = document.querySelector(".popup__image"),
      imgPopupCaption = document.querySelector(".popup__image-name"),     
      popupList = Array.from(document.querySelectorAll(".popup")),
      
      popupObjects = popupList.map(element => {
        let popupId = element.id;
        let popup = new Popup(popupId);
        return popup
      }),
      nameEditPopupObject = new Popup("nameEditPopup"),
      photoAddPopupObject = new Popup("addPhotoPopup"),  
      avatarEditPopupObject = new Popup("avatarEditPopup"),  
      bigImgPopupObject = new PopupWithImage("bigImgPopup"),
    
      photoSubmitBtn = document.querySelector('#photoSubmitBtn'),
      avatar = document.querySelector(".profile__avatar-wrapper"),
      avatarEditOverlay = document.querySelector(".profile__avatar-overlay"),
      avatarEditPopup = document.querySelector("#avatarEditPopup"),
      avatarInput = document.querySelector("#avatarInput"),
      avatarEditForm = document.querySelector("#avatarEditForm"),
      avatarPic = document.querySelector('.profile__avatar');
     


export {
  nameEditPopup,
  photoAddPopup,  
  nameEditBtn,
  photoAddBtn,
  nameEditForm,
  nameInput,
  jobInput,
  userName,
  userJob,
  photoForm,
  photoTitleInput,
  linkInput,
  cardsContainer,
  cardTemplate,
  // bigImgPopup,
  imgBigSize,
  imgPopupCaption,
  // popupList,
  nameEditPopupObject,
  photoAddPopupObject,
  avatarEditPopupObject,
  bigImgPopupObject,

  popupObjects,
  photoSubmitBtn,
  avatar,
  avatarEditOverlay,
  avatarEditPopup,
  avatarInput,
  avatarEditForm,
  avatarPic  
}
