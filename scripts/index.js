import { Card } from './card.js';
import { FormValidator } from './FormValidator.js';
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

const config = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'form__input-error_active',
};

const editProfileButton = document.querySelector('.profile__button');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const formElementProfile = document.querySelector('.popup__form_profile');
const nameInput = document.querySelector('.form__input_type_name');
const jobInput = document.querySelector('.form__input_type_job');
const addNewCardButton = document.querySelector('.profile__add');
const popupProfileInfo = document.querySelector('.popup_type_new-info');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImgCard = document.querySelector('.popup_type_image');
const newCardName = document.querySelector('.form__input_type_name-card');
const newCardUrl = document.querySelector('.form__input_type_url-card');
const cardsContainer = document.querySelector('.elements');
const formElementCard = document.querySelector('.popup__form_card');

const popupList = document.querySelectorAll('.popup');

const formValidProfile = new FormValidator(config, formElementProfile);
formValidProfile.enableValidation();

const formValidCard = new FormValidator(config, formElementCard);
formValidCard.enableValidation();

function addInitialCards() {
  initialCards.forEach(function (item) {
    const link = item.link;
    const name = item.name;
    renderCards(name, link, cardsContainer, 'append');
  });
}

function addNewCardSubmitHandler(evt) {
  evt.preventDefault();
  const name = newCardName.value;
  const link = newCardUrl.value;

  renderCards(name, link, cardsContainer);
  closePopup(popupNewCard);
}

function renderCards(name, link, container) {
  const cardItem = new Card({ name, link }, '.tempalte-default');
  const renderCard = cardItem.createCard();

  return container.prepend(renderCard);
}

function closePopup(modal) {
  modal.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
}

function closeByEsc(evt) {
  if (evt.keyCode === 27) {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function openPopup(modal) {
  modal.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
}

function openEditProfilePopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  const eventInput = new Event('input');
  nameInput.dispatchEvent(eventInput);
  jobInput.dispatchEvent(eventInput);
  openPopup(popupProfileInfo);
}

function closePopupByClick(evt) {
  const closeBtn = evt.target;

  if (closeBtn.classList.contains('popup__close')) {
    const currentPopup = closeBtn.closest('.popup');
    closePopup(currentPopup);
  }
}

function addEditProfileSubmitHandler() {
  formElementProfile.addEventListener('submit', function (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupProfileInfo);
  });
}

editProfileButton.addEventListener('click', function () {
  openEditProfilePopup(popupProfileInfo);
});

addNewCardButton.addEventListener('click', () => {
  formElementCard.reset();
  const toggleButtonState = new FormValidator(config, formElementCard)
  toggleButtonState.toggleButtonState()
  openPopup(popupNewCard);
});

[popupProfileInfo, popupNewCard, popupImgCard].forEach((popup) =>
  popup.addEventListener('click', closePopupByClick)
);

formElementCard.addEventListener('submit', addNewCardSubmitHandler);

popupList.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    closePopup(evt.target);
  });
});

addEditProfileSubmitHandler();
addInitialCards();
