import popupWithSumbit from '../components/PopupWithSumbit.js';
import { Api } from '../components/Api.js';
import './index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import {
  config,
  editProfileButton,
  formElementProfile,
  nameInput,
  jobInput,
  addNewCardButton,
  formElementCard,
  AvatarEditBtn,
  formEditAvatar,
} from '../utils/constans.js';

const validatorForEditProfileForm = new FormValidator(
  config,
  formElementProfile
);
validatorForEditProfileForm.enableValidation();

const validatorForEditCardForm = new FormValidator(config, formElementCard);
validatorForEditCardForm.enableValidation();

const validatorForEditAvatar = new FormValidator(config, formEditAvatar);
validatorForEditAvatar.enableValidation();

const viewImagePopup = new PopupWithImage('.popup_type_image');

const popupEditForm = new PopupWithForm({
  popupSelector: '.popup_type_new-info',
  submitHandler: (dataInfo) => {
    popupEditForm.loading(true);
    api
      .editUserInfo(dataInfo)
      .then((dataInfo) => {
        userInfo.setUserInfo(dataInfo);
        popupEditForm.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        popupEditForm.loading(false);
      });
  },
});

editProfileButton.addEventListener('click', () => {
  const info = userInfo.getUserInfo();
  openEditProfilePopup({
    username: info.username,
    job: info.job,
  });
  validatorForEditProfileForm.resetError();
  popupEditForm.open();
});

const configApi = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-51',
  headers: {
    authorization: 'c1d711c0-3ad8-435d-b45d-89726a640339',
    'Content-Type': 'application/json',
  },
};

const api = new Api(configApi);

let userId;

Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([initialCards, userData]) => {
    userInfo.setUserInfo(userData);
    userId = userData._id;
    cardsList.renderItems(initialCards);
  })
  .catch((err) => console.log(err));

const cardsList = new Section(
  {
    renderer: (card) => {
      cardsList.addItem(createCard(card));
    },
  },
  '.elements'
);

const userInfo = new UserInfo({
  username: '.profile__title',
  job: '.profile__subtitle',
  avatar: '.profile__image',
});

const popupDeleteCard = new popupWithSumbit({
  popupSelector: '.popup_type_delete-card',
});

popupDeleteCard.setEventListeners();

const PopupEditAvatar = new PopupWithForm({
  popupSelector: '.popup_type_avatar',
  submitHandler: (dataAvatar) => {
    PopupEditAvatar.loading(true);
    api
      .editAvatar(dataAvatar)
      .then((dataAvatar) => {
        userInfo.setUserInfo(dataAvatar);
        PopupEditAvatar.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        popupEditForm.loading(false);
      });
  },
});

const popupAddCard = new PopupWithForm({
  popupSelector: '.popup_type_new-card',
  submitHandler: (inputValues) => {
    popupAddCard.loading(true);
    api
      .addCard(inputValues)
      .then((inputValues) => {
        cardsList.addItem(createCard(inputValues));
        popupAddCard.close(inputValues);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        popupEditForm.loading(false);
      });
  },
});

function openEditProfilePopup({ username, job }) {
  nameInput.value = username;
  jobInput.value = job;
}

function createCard(data) {
  const cardItem = new Card({
    data: data,
    userId: userId,
    templateSelector: '.tempalte-default',
    handleCardClick: (name, link) => {
      viewImagePopup.open(name, link);
    },
    handleClickDelete: (cardInstance) => {
      popupDeleteCard.open();
      popupDeleteCard.submitCallback(() =>
        api
          .removeCard(cardInstance.getId())
          .then(() => {
            cardItem.remove();
            popupDeleteCard.close();
          })
          .catch((err) => console.log(err))
      );
    },
    handleClickSetLike: (cardInstance) => {
      api
        .setLike(cardInstance.getId())
        .then((cardInstance) => {
          cardItem.handleLikeCard(cardInstance);
        })
        .catch((err) => console.log(err));
    },
    handleClickRemoveLike: (cardInstance) => {
      api
        .deleteLike(cardInstance.getId())
        .then((cardInstance) => {
          cardItem.handleLikeCard(cardInstance);
        })
        .catch((err) => console.log(err));
    },
  });
  return cardItem.createCard();
}

PopupEditAvatar.setEventListeners();

popupAddCard.setEventListeners();

popupEditForm.setEventListeners();

AvatarEditBtn.addEventListener('click', () => {
  validatorForEditAvatar.resetError();
  PopupEditAvatar.open();
});

addNewCardButton.addEventListener('click', () => {
  validatorForEditCardForm.resetError();
  popupAddCard.open();
});

viewImagePopup.setEventListeners();
