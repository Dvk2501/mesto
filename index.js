const openButton = document.querySelector ('.profile__button')
const closeButton = document.querySelector ('.popup__close')
const popup = document.querySelector ('.popup')
const section = document.querySelector ('section')
const firstname = document.querySelector ('name')


function popupOpen (e) {
  e.preventDefault()
  popup.classList.add('popup_opened')
}

function popupClose (e) {
  e.preventDefault()
  popup.classList.remove('popup_opened')
}

openButton.addEventListener('click', popupOpen);
closeButton.addEventListener('click', popupClose)

function qs(selector) {
  return document.querySelector(selector);
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  qs('.profile__title').textContent = qs('.popup__text_type_name').value;
  qs('.profile__subtitle').textContent = qs('.popup__text_type_about').value;
  closeEditForm();
}

function closeEditForm() {}

document.getElementById('submit').addEventListener('click', formSubmitHandler);
