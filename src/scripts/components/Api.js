export default class Api {
    constructor(item) {
        this._baseUrl = item.baseUrl;
        this._headers = item.headers;
    }

    _responseAnalysis(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getData() {
        return Promise.all([this.createInitialCards(), this.uploadUserInformation()]);
    }

    uploadUserInformation() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        })
            .then(res => this._responseAnalysis(res));
    }

    createInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers
        })
            .then(res => this._responseAnalysis(res));
    }

    deleteImageCard(item) {
        return fetch(`${this._baseUrl}/cards/${item}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(res => this._responseAnalysis(res));
    }

    deleteLikes(item) {
        return fetch(`${this._baseUrl}/cards/${item}/likes`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(res => this._responseAnalysis(res));
    }

    likesImage(item) {
        return fetch(`${this._baseUrl}/cards/${item}/likes`, {
            method: 'PUT',
            headers: this._headers
        })
            .then(res => this._responseAnalysis(res));
    }

    changeAvatar(item) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: item.link
            })
        })
            .then(res => this._responseAnalysis(res));
    }

    changeUserinformation(item) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: item.name,
                about: item.info
            })
        })
            .then(res => this._responseAnalysis(res));
    }

    newImageCard(item) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: item.text,
                link: item.url
            })
        })
            .then(res => this._responseAnalysis(res));
    }
}