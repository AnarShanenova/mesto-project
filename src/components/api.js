const apiConfig = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-20",
  headers: {
    authorization: "340a2beb-4d1b-4011-9455-07dbc10b8c56",
    "Content-Type": "application/json",
  }
};
// Проверка ответа сервера
const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

// Получить информацию о пользователе
export function getUserInf() {
  return fetch(`${apiConfig.baseUrl}/users/me`, {
    method: 'GET',
    headers: {
      authorization: apiConfig.headers.authorization
    }
  })
  .then(res => checkResponse(res));
}

// Редактирование информации о пользователе 
export function updateUserInf(userNameInf, userJobInf) {
  return fetch(`${apiConfig.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: apiConfig.headers,
    body: JSON.stringify ({
      name: userNameInf,
      about: userJobInf
    })
  })
  .then(res => checkResponse(res));
}

// Обновление фото-аватара пользователя
export function updateUserAvatar(userAvatar) {
  return fetch(`${apiConfig.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: apiConfig.headers,
    body: JSON.stringify ({
      avatar: userAvatar
    })
  })
  .then(res => checkResponse(res));
}

// Запрос фото-карточек с сервера
export function getInitialCards() {
  return fetch(`${apiConfig.baseUrl}/cards`, {
    method: 'GET',
    headers: apiConfig.headers
  })
  .then(res => checkResponse(res));
}

// Поставить лайк
export function putLike(id) {
  return fetch(`${apiConfig.baseUrl}/cards/likes/${id}`, {
    method: 'PUT',
    headers: {
      authorization: apiConfig.headers.authorization
    }
  })
  .then(res => checkResponse(res));
}
// Убрать лайк
export function removeLike(id) {
  return fetch(`${apiConfig.baseUrl}/cards/likes/${id}`, {
    method: 'DELETE',
    headers: {
      authorization: apiConfig.headers.authorization
    }
  })
  .then(res => checkResponse(res));
}

// Добавление новой карточки пользователем
export function addCard(cardTitle, cardImgUrl) {
  return fetch(`${apiConfig.baseUrl}/cards`, {
    method: 'POST',
    headers: {
      authorization: apiConfig.headers.authorization,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify ({
      name: cardTitle,
      link: cardImgUrl
    })
  })
  .then(res => checkResponse(res));
}

// Удаление фото-карточки
export function deleteCard(id) {
  return fetch(`${apiConfig.baseUrl}/cards/${id}`, {
    method: 'DELETE',
    headers: {
      authorization: apiConfig.headers.authorization
    }
  })
  .then(res => checkResponse(res));
}
