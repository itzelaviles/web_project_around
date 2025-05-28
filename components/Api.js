export class Api {
  constructor ({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  _request(url, method, body = null) {
    const config = {
      method,
      headers: this._headers,
    };
    if (body) {
      config.body = JSON.stringify(body);
    }
    return fetch(`${this._baseUrl}${url}`, config).then(this._checkResponse);
  }

  // User
  getUserInfo() {
    return this._request('/users/me', 'GET');
  }

  updateUserInfo(data) {
    return this._request('/users/me', 'PATCH', {
      name: data.name,
      about: data.description
    });
  }

  updateUserAvatar(data) {
    return this._request('/users/me/avatar', 'PATCH', { avatar: data.avatarUrl });
  }

  // Cards
  getInitialCards() {
    return this._request('/cards', 'GET');
  }

  addCard(card) {
    return this._request('/cards', 'POST', {
      name: card.title,
      link: card.imageUrl
    });
  }

  deleteCard(cardId) {
    return this._request(`/cards/${cardId}`, 'DELETE')
  }

  // Likes
  likeCard(cardId) {
    return this._request(`/cards/${cardId}/likes`, 'PUT');
  }

  unlikeCard(cardId) {
    return this._request(`/cards/${cardId}/likes`, 'DELETE');
  }

  toggleLike(cardId, isLiked) {
    return isLiked ? this.likeCard(cardId) : this.unlikeCard(cardId);
  }
}