const popupImgCard = document.querySelector(".popup_type_image");
const popupCardText = document.querySelector(".popup__caption");
const popupCardImg = document.querySelector(".popup__image");


export class Card {
  constructor(data, templateSelector) {
    this._title = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._cardElement = this._getTemplate();
  }

  createCard() {
    this._cardElement = this._getTemplate();
    this._setEventListeners();
    this._cardElement.querySelector(".element__title").textContent =
      this._title;
    this._cardElement.querySelector(".element__image").src = this._link;
    this._cardElement.querySelector(".element__image").alt = this._title;

    return this._cardElement;
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardTemplate;
  }

  _setEventListeners() {
    this._cardElement.querySelector(".element__like").addEventListener("click", () => {
      this._toggleLike();
    });

    this._cardElement
      .querySelector(".element__delete")
      .addEventListener("click", () => {
        this._deleteCard();
      });

      this._cardElement.querySelector(".element__image").addEventListener("click", () => {
      this._handleOpenPopup();
    });
  }

  _toggleLike() {
    this._cardElement.querySelector(".element__like").classList.toggle("element__like_active");
  }

  _deleteCard() {
    this._cardElement.remove();
  }

  _handleOpenPopup() {
    popupCardText.textContent = this._title
    popupCardImg.src = this._link
    popupImgCard.classList.add('popup_opened')

  }
}
