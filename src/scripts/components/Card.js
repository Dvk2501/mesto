export class Card {
  constructor({
    data,
    templateSelector,
    handleCardClick,
    handleClickDelete,
    userId,
    handleClickSetLike,
    handleClickRemoveLike,
  }) {
    this._data = data;
    this._handleCardClick = handleCardClick;
    this._handleClickDelete = handleClickDelete;
    this._title = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleClickSetLike = handleClickSetLike;
    this._handleClickRemoveLike = handleClickRemoveLike;
    this._likes = data.likes;
    this._userId = userId;
    this._cardId = data._id;
    this._cardOwnerId = data.owner._id;
  }

  _getTemplate() {
    this._cardTemplate = document
      .querySelector(this._templateSelector)
      .content.querySelector('.element')
      .cloneNode(true);

    return this._cardTemplate;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      if (this._likeButton.classList.contains('element__like_active')) {
        this._handleClickRemoveLike(this);
      } else {
        this._handleClickSetLike(this);
      }
    });
    this._cardbuttonDelete.addEventListener('click', () => {
      this._handleClickDelete(this);
    });
    this._image.addEventListener('click', () => {
      this._handleCardClick(this._title, this._link);
    });
  }

  createCard() {
    this._cardElement = this._getTemplate();
    this._cardElement.querySelector('.element__title').textContent =
      this._title;
    this._image = this._cardElement.querySelector('.element__image');
    this._image.src = this._link;
    this._image.alt = this._title;
    this._likeNumber = this._cardElement.querySelector('.element__like-number');
    this._cardbuttonDelete =
      this._cardElement.querySelector('.element__delete');
    this._likeButton = this._cardElement.querySelector('.element__like');
    this._likeNumber.textContent = this._likes.length;
    this._DeleteBtn();
    this._CardLiked();
    this._setEventListeners();

    return this._cardElement;
  }

  handleLikeCard(data) {
    this._likes = data.likes;
    this._likeNumber.textContent = this._likes.length;
    this._likeButton.classList.toggle('element__like_active');
  }

  _DeleteBtn() {
    if (this._userId !== this._cardOwnerId) {
      this._cardbuttonDelete.remove();
    }
  }

  _CardLiked() {
    if (
      this._likes.some((user) => {
        return this._userId === user._id;
      })
    ) {
      this._likeButton.classList.add('element__like_active');
    }
  }

  remove() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  getId() {
    return this._data._id;
  }
}
