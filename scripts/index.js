const openButton = document.querySelector(".profile__button");
const closeButton = document.querySelector(".popup__close");
const popupNode = document.querySelector(".popup");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__subtitle");
const formElement = document.querySelector(".popup__form");
const nameInput = document.querySelector(".form__input_type_name");
const jobInput = document.querySelector(".form__input_type_job");
const newAddCardButton = document.querySelector(".profile__add");
const popupNewInfo = document.querySelector(".popup_type_new-info");
const popupNewCard = document.querySelector(".popup_type_new-card");
const newCardName = document.querySelector(".form__input_type_name-card");
const newCardNameUrl = document.querySelector(".form__input_type_url-card");
const root = document.querySelector('.page')


const selectors = {
  form: '.popup__form',
  input: '.form__input_type_name-card',

}

const form = document.querySelector(selectors.form);


function addEventListener() {
  const input = form.querySelector(selectors.input);
  form.addEventListener('sumbit', function(evt){
  evt.preventDefault();
  console.log(input.value);
})}







function openPopup(modal) {
  modal.classList.add("popup_opened");
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function closePopup(modal) {
  modal.classList.remove('popup_opened');
}

function closePopupclick(evt) {
  const closeBtn = evt.target;

  if (closeBtn.classList.contains('popup__close')) {
    const currentPopup = closeBtn.closest('.popup');
    closePopup(currentPopup);
  }
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupNode);
}

openButton.addEventListener("click", function () {
  openPopup(popupNode);
});

newAddCardButton.addEventListener("click", function () {
  openPopup(popupNewCard);
});

root.addEventListener('click',closePopupclick);

formElement.addEventListener("submit", formSubmitHandler);

addEventListener();
