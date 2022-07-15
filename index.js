const openButton = document.querySelector ('.profile__button');
const closeButton= document.querySelector ('.popup__close');
const popupNode = document.querySelector ('.popup');
const profilename = document.querySelector ('.profile__title');
const profilejob = document.querySelector ('.profile__subtitle');
const root = document.querySelector ('.root');
let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.form__input_name');
let jobInput = formElement.querySelector ('.form__input_job');

openButton.addEventListener('click',function() {
  openPopup (popupNode)
})


root.addEventListener('click', closePopupButtonClick)

function openPopup (modal) {
modal.classList.add('popup_opened')
}

function closePopup(modal) {
  modal.classList.remove('popup_opened')
}


function closePopupButtonClick (evt) {

const closeBtn = evt.target;

if (closeBtn.classList.contains('popup__close')) {
  const currentPopup = closeBtn.closest('.popup');
  closePopup(currentPopup)
 }
}



function setPopupInputvalue() {
  nameInput.value = profilename.textContent;
  jobInput.value = profilejob.textContent;
}

function setNodeTextValue() {
  profilename.textContent = nameInput.value;
profilejob.textContent = jobInput.value;
}


function formSubmitHandler (evt) {
    evt.preventDefault();
   setNodeTextValue();
   closePopup(popupNode)
}


openButton.addEventListener ('click', function() {
  setPopupInputvalue()
  openPopup(popupNode)
})



formElement.addEventListener('submit', formSubmitHandler);




