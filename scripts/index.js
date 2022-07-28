const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const openButton = document.querySelector(".profile__button");
const closeButton = document.querySelector(".popup__close");
const popupNode = document.querySelector(".popup");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__subtitle");
const formElementProfole = document.querySelector(".popup__form");
const nameInput = document.querySelector(".form__input_type_name");
const jobInput = document.querySelector(".form__input_type_job");
const newAddCardButton = document.querySelector(".profile__add");
const popupNewInfo = document.querySelector(".popup_type_new-info");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupImgCard = document.querySelector(".popup_type_image");
const newCardName = document.querySelector(".form__input_type_name-card");
const newCardUrl = document.querySelector(".form__input_type_url-card");
const elementList = document.querySelector('.element__list');
const formElementCard = document.querySelector('.popup__form_card');
const root = document.querySelector('.page');
const element = document.querySelector('.element');
const templateElement = document.querySelector('#element-item-template').content.querySelector('.element');
const cardText = document.querySelector('.element__title');
const deleteBtn = document.querySelector('.element__delete');
const lileBtn = document.querySelector('.element__like');
const CardImg = document.querySelector('.element__image')
const popupCardText = document.querySelector('.popup__caption')
const popupCardImg = document.querySelector('.popup__image')



function createCard(name,link){
const cardElement = templateElement.cloneNode(true)
const newCardText = cardElement.querySelector('.element__title')
const newCardImg = cardElement.querySelector('.element__image')
const deleteCardBtn = cardElement.querySelector('.element__delete')
const likeCardBtn = cardElement.querySelector('.element__like')

newCardText.textContent = name
newCardImg.src = link

deleteCardBtn.addEventListener('click', function(){
  cardElement.remove();
})

likeCardBtn.addEventListener('click', function(){
  likeCardBtn.classList.toggle('element__like_active')
})

newCardImg.addEventListener("click", function () {

  popupCardText.textContent = name
  popupCardImg.src = link
  openPopup(popupImgCard);
});

elementList.prepend(cardElement)

}

function addEventListener() {
  formElementCard.addEventListener('submit', function(evt){
    evt.preventDefault();
    createCard(newCardName.value,newCardUrl.value)
    closePopup(popupNewCard)
  })
}



function creareInitialCard() {
  initialCards.forEach((item) => createCard(item.name,item.link ));
}





function openPopup(modal) {
  modal.classList.add("popup_opened");

}

function addNewinfo() {
  popupNewInfo.classList.add("popup_opened");
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
  closePopup(popupNewInfo);
}




openButton.addEventListener("click", function () {
  addNewinfo(popupNewInfo);
});

newAddCardButton.addEventListener("click", function () {
  openPopup(popupNewCard);
  newCardName.value =''
  newCardUrl.value = ''

});

root.addEventListener('click',closePopupclick);

formElementProfole.addEventListener("submit", formSubmitHandler);

addEventListener();
creareInitialCard();
