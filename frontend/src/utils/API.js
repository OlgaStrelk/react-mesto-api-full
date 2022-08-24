import { BASE_URL } from "./consts";

class Api {
  constructor({ baseUrl, headers }) {
    this._headers = headers;
    this._baseUrl = baseUrl;
  }

  getProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
  }

  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
  }

  editProfile(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
  }

  addCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
  }

  changeLikeCardStatus(cardId, like) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: like ? "PUT" : "DELETE",
      headers: this._headers,
    }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
  }

  changeUserPic(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
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
    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
  },
});
