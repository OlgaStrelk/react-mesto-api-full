import { BASE_URL } from "./consts";

class Api {
  constructor({ baseUrl, headers }) {
    this._headers = headers;
    this._baseUrl = baseUrl;
  }

  getProfile(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: { ...this._headers, Authorization: `Bearer ${token}` },
    }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
  }

  getCards(token) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: { ...this._headers, Authorization: `Bearer ${token}` },
    }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
  }

  editProfile(name, about, token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: { ...this._headers, Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        name,
        about,
      }),
    }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
  }

  addCard(name, link, token) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: { ...this._headers, Authorization: `Bearer ${token}` },

      body: JSON.stringify({
        name,
        link,
      }),
    }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
  }

  deleteCard(id, token) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: { ...this._headers, Authorization: `Bearer ${token}` },
    }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
  }

  changeLikeCardStatus(cardId, like, token) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: like ? "PUT" : "DELETE",
      headers: { ...this._headers, Authorization: `Bearer ${token}` },
    }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
  }

  changeUserPic(avatar, token) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: { ...this._headers, Authorization: `Bearer ${token}` },

      body: JSON.stringify({
        avatar,
      }),
    }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
  }
}

export const api = new Api({
  baseUrl: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
