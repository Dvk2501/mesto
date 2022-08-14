const editPofileButton = document.querySelector('.profile__button');
const popupNode = document.querySelector('.popup');
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
const elementsList = document.querySelector('.elements');
const formElementCard = document.querySelector('.popup__form_card');
const element = document.querySelector('.element');
const templateElement = document
  .querySelector('#element-item-template')
  .content.querySelector('.element');
const cardText = document.querySelector('.element__title');
const cardImage = document.querySelector('.element__image');
const popupCardText = document.querySelector('.popup__caption');
const popupCardImg = document.querySelector('.popup__image');
const popupOverlay = document.querySelectorAll(".popup");

function createCard(name, link) {
  const cardElement = templateElement.cloneNode(true);
  const newCardText = cardElement.querySelector('.element__title');
  const newCardImg = cardElement.querySelector('.element__image');
  const deleteCardBtn = cardElement.querySelector('.element__delete');
  const likeCardBtn = cardElement.querySelector('.element__like');

  newCardText.textContent = name;
  newCardImg.src = link;
  newCardImg.alt = name;
  deleteCardBtn.addEventListener('click', function () {
    cardElement.remove();
  });

  likeCardBtn.addEventListener('click', function () {
    likeCardBtn.classList.toggle('element__like_active');
  });

  newCardImg.addEventListener('click', function () {
    popupCardText.textContent = name
    popupCardImg.src = link
    openPopup(popupImgCard);
  });

  return cardElement;
}

function renderCard(data, container) {
  const card = createCard(data.name, data.link);
  container.prepend(card);
}

function creareInitialCards() {
  initialCards.forEach((item) => renderCard(item, elementsList));
}

function closePopup(modal) {
  modal.classList.remove('popup_opened');
  document.removeEventListener("keydown", closeByEsc);
}

function closeByEsc(evt) {
  if (evt.keyCode === 27) {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

function openPopup(modal) {
  modal.classList.add('popup_opened');
  document.addEventListener("keydown", closeByEsc);
}

function addNewInfo() {
  openPopup(popupProfileInfo);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  let eventInput = new Event("input"); //создаем событие

  nameInput.dispatchEvent(eventInput) //запускаем событие на инпуте
  jobInput.dispatchEvent(eventInput) //запускаем событие на инпуте
}


function closePopupByClick(evt) {
  const closeBtn = evt.target;

  if (closeBtn.classList.contains('popup__close')) {
    const currentPopup = closeBtn.closest('.popup');
    closePopup(currentPopup);
  }
}

popupOverlay.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    closePopup(evt.target);
  });
});

function addEditProfileSubmitHandler() {
  formElementProfile.addEventListener('submit', function (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupProfileInfo);
  });
}

function addNewCardSubmitHandler () {
  formElementCard.addEventListener('submit', function (evt) {
    evt.preventDefault();
    const element = createCard(newCardName.value, newCardUrl.value);
    elementsList.prepend(element);
    closePopup(popupNewCard);
  });
}

editPofileButton.addEventListener('click', function () {
  addNewInfo(popupProfileInfo);
});



addNewCardButton.addEventListener('click',  (config) => {
  formElementCard.reset()
  const inputList = Array.from(formElementCard.querySelectorAll(config.inputSelector));
  const buttonElement = formElementCard.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonElement,config);
  openPopup(popupNewCard);
});

[popupProfileInfo, popupNewCard, popupImgCard].forEach(popup => popup.addEventListener('click', closePopupByClick));

addEditProfileSubmitHandler();
addNewCardSubmitHandler ();
creareInitialCards();
