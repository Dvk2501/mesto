import './index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {
  initialCards,
  config,
  editProfileButton,
  formElementProfile,
  nameInput,
  jobInput,
  addNewCardButton,
  formElementCard,
} from '../utils/constans.js';

const validatorForEditProfileForm = new FormValidator(config, formElementProfile);
validatorForEditProfileForm.enableValidation();

const validatorForEditCardForm = new FormValidator(config, formElementCard);
validatorForEditCardForm.enableValidation();

const viewImagePopup = new PopupWithImage('.popup_type_image');

const cardsList = new Section(
  {
    items: initialCards,
    renderer: (card) => {
      cardsList.addItem(createCard(card));
    },
  },
  '.elements'
);

const userInfo = new UserInfo({
  username: '.profile__title',
  job: '.profile__subtitle',
});

const popupEditForm = new PopupWithForm({
  popupSelector: '.popup_type_new-info',
  submitHandler: (inputValue) => {
    userInfo.setUserInfo(inputValue);
    popupEditForm.close();
  },
});

const popupAddCard = new PopupWithForm({
  popupSelector: '.popup_type_new-card',
  submitHandler: (inputValues) => {
    cardsList.addItem(createCard(inputValues));
    popupAddCard.close();
  },
});

function openEditProfilePopup({ username, job }) {
  nameInput.value = username;
  jobInput.value = job;
}

function createCard(data) {
  const cardItem = new Card({
    data: data,
    templateSelector: '.tempalte-default',
    handleCardClick: (name, link) => {
      viewImagePopup.open(name, link);
    },
  });
  return cardItem.createCard();
}

popupAddCard.setEventListeners();

popupEditForm.setEventListeners();

editProfileButton.addEventListener('click', () => {
  const info = userInfo.getUserInfo();
  openEditProfilePopup({
    username: info.username,
    job: info.job,
  });
  validatorForEditProfileForm.resetError();
  popupEditForm.open();
});

addNewCardButton.addEventListener('click', () => {
  validatorForEditCardForm.resetError();
  popupAddCard.open();
});

viewImagePopup.setEventListeners();

cardsList.renderItems(initialCards);
