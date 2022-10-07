import  Popup  from './popup.js';

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, submitHandler }) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._submitHandler = submitHandler;
    this._inputList = this._form.querySelectorAll('.form__input');
    this._submitBtn = this._form.querySelector('.form__submit');
    this._submitBtnText = this._submitBtn.textContent;
  }

  _getInputValues() {
    this._inputValue = {};
    this._inputList.forEach((input) => {
      this._inputValue[input.name] = input.value;
    });
    return this._inputValue;
  }

  setEventListeners() {
    this._form.addEventListener('submit', (e) => {
      e.preventDefault();
      this._submitHandler(this._getInputValues());
    });

    super.setEventListeners();
  }

  close() {
    this._form.reset();
    super.close();
  }

  loading(isLoading) {
    if (isLoading) {
      this._submitBtn.textContent = 'Сохранение...'
    } else {
      this._submitBtn.textContent = this._submitBtnText;
    }
  }
}
