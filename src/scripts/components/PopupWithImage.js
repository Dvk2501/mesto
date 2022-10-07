import  Popup  from './popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupName = this._popup.querySelector('.popup__caption');
    this._popupImage = this._popup.querySelector('.popup__image');
  }

  open(name, link) {
    this._popupName.textContent = name;
    this._popupImage.src = link;
    this._popupImage.alt = name;

    super.open();
  }
}
