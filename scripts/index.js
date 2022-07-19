const openButton = document.querySelector(".profile__button");
const closeButton = document.querySelector(".popup__close");
const popupNode = document.querySelector(".popup");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__subtitle");
const formElement = document.querySelector(".popup__form");
const nameInput = formElement.querySelector(".form__input_type_name");
const jobInput = formElement.querySelector(".form__input_type_job");

function openPopup(modal) {
  modal.classList.add("popup_opened");
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function closePopup(modal) {
  modal.classList.remove("popup_opened");
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

closeButton.addEventListener("click", function () {
  closePopup(popupNode);
});

formElement.addEventListener("submit", formSubmitHandler);
