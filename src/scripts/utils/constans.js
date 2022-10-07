const config = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'form__input-error_active',
};

const editProfileButton = document.querySelector('.profile__button');
const formElementProfile = document.querySelector('.popup__form_profile');
const nameInput = document.querySelector('.form__input_type_name');
const jobInput = document.querySelector('.form__input_type_job');
const addNewCardButton = document.querySelector('.profile__add');
const AvatarEditBtn = document.querySelector('.profile__image-btn')
const EditAvatar = document.querySelector('.popup_type_avatar')
const formEditAvatar = EditAvatar.querySelector('.popup__form')
const formElementCard = document.querySelector('.popup__form_card');

export {config,editProfileButton,formElementProfile,nameInput,jobInput,addNewCardButton,formElementCard,AvatarEditBtn,EditAvatar,formEditAvatar}
