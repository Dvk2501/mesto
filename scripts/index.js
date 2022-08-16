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
const cardTemplate = document
  .querySelector('#element-item-template')
  .content.querySelector('.element');
const popupCardText = document.querySelector('.popup__caption');
const popupCardImg = document.querySelector('.popup__image');
const popupList = document.querySelectorAll(".popup");
const inputList = Array.from(formElementCard.querySelectorAll('.form__input'));
const buttonElement = formElementCard.querySelector('.form__submit');

function createCard(name, link) {
  const cardElement = cardTemplate.cloneNode(true);
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

function createInitialCards() {
  initialCards.forEach((item) => renderCard(item, cardsContainer));
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

function openEditProfilePopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  const eventInput = new Event("input");
  nameInput.dispatchEvent(eventInput)
  jobInput.dispatchEvent(eventInput)
  openPopup(popupProfileInfo);
}


function closePopupByClick(evt) {
  const closeBtn = evt.target;

  if (closeBtn.classList.contains('popup__close')) {
    const currentPopup = closeBtn.closest('.popup');
    closePopup(currentPopup);
  }
}

popupList.forEach((popup) => {
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
    const card = createCard(newCardName.value, newCardUrl.value);
    cardsContainer.prepend(card);
    closePopup(popupNewCard);
  });
}

editProfileButton.addEventListener('click', function () {
  openEditProfilePopup(popupProfileInfo);
});

addNewCardButton.addEventListener('click',  () => {
  formElementCard.reset()
  toggleButtonState(inputList, buttonElement,validationConfig);
  openPopup(popupNewCard);
});

[popupProfileInfo, popupNewCard, popupImgCard].forEach(popup => popup.addEventListener('click', closePopupByClick));

addEditProfileSubmitHandler();
addNewCardSubmitHandler ();
createInitialCards();
