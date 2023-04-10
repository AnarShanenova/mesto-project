export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  // Метод проверки ответа сервера
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  // Универсальный метод запроса с проверкой ответа
  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  // Метод получения информации о пользователе
  getUser() {
    const url = `${this._baseUrl}/users/me`;
    const options = {
      method: "GET",
      headers: this._headers,
    };
    return this._request(url, options);
  }

  // Метод редактирования информации о пользователе
  updateUserInf(data) {
    const url = `${this._baseUrl}/users/me`;
    const options = {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    };
    return this._request(url, options);
  }

  // Метод редактирования аватара пользователя
  updateUserAvatar(data) {
    const url = `${this._baseUrl}/users/me/avatar`;
    const options = {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    };
    return this._request(url, options);
  }

  // Метод запроса карточек с сервера
  getInitialCards() {
    const url = `${this._baseUrl}/cards`;
    const options = {
      method: "GET",
      headers: this._headers,
    };
    return this._request(url, options);
  }

  // Метод добавления лайка
  putLike(id) {
    const url = `${this._baseUrl}/cards/likes/${id}`;
    const options = {
      method: "PUT",
      headers: this._headers,
    };
    return this._request(url, options);
  }

  // Метод удаления лайков
  removeLike(id) {
    const url = `${this._baseUrl}/cards/likes/${id}`;
    const options = {
      method: "DELETE",
      headers: this._headers,
    };
    return this._request(url, options);
  }

  // Метод добавления новой карточки пользователем
  addCard(data) {
    const url = `${this._baseUrl}/cards`;
    const options = {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    };
    return this._request(url, options);
  }

  // Метод удаления карточки
  deleteCard(id) {
    const url = `${this._baseUrl}/cards/${id}`;
    const options = {
      method: "DELETE",
      headers: this._headers,
    };
    return this._request(url, options);
  }
}
