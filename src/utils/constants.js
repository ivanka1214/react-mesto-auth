const initialCards = [
  {
    title: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    title: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    title: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    title: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    title: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    title: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const buttonOpenFormEditProfile = document.querySelector('.profile__edit-button');
const buttonOpenFormAddCard = document.querySelector('.profile__add-button');
const formAddCard = document.forms.addData;
const formEditProfile = document.forms.editData;
const placeTemplate = '#element_card';
const popupProfileSelector = '.popup_type_edit-profile';
const popupImageSelector = '.popup_type_image';
const listElementSelector = '.elements';
const popupDeleteSelector ='.popup_type_delete';
const popupAddCardSelector = '.popup_type_add-profile';
const avatarImageElement = document.querySelector('.profile__container');
const formAvatar = document.forms.editAvatar;
const popupEditAvatarSelector = '.popup_type_avatar';
const configInfo = {
  profileNameSelector: '.profile__title',
  profileJobSelector: '.profile__subtitle',
  profileAvatar:'.profile__avatar'
}

const dataValidation = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  errorTemplate: 'popup__error_type_',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
};

export {
  initialCards,
  buttonOpenFormEditProfile,
  buttonOpenFormAddCard,
  formAddCard,
  formEditProfile,
  placeTemplate,
  popupEditAvatarSelector,
  popupProfileSelector,
  popupImageSelector,
  avatarImageElement,
  formAvatar,
  popupDeleteSelector,
  listElementSelector,
  popupAddCardSelector,
  configInfo,
  dataValidation
};
