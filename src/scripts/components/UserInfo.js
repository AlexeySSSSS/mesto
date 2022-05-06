export default class UserInfo {
    constructor({ profileName, profileDescription, profileAvatar }) {
        this._profileName = document.querySelector(profileName);
        this._profileDescription = document.querySelector(profileDescription);
        this._profileAvatar = document.querySelector(profileAvatar);
    }

    getUserInfo() {
        return {
            profileName: this._profileName.textContent,
            profileDescription: this._profileDescription.textContent,
            profileAvatar: this._profileAvatar.src
        };
    }

    setUserInfo(item) {
        this._profileName.textContent = item.name;
        this._profileDescription.textContent = item.about;
        this._profileAvatar.src = item.avatar;
    }

    saveId(item) {
        this._userId = item._id;
    }

    returnId() {
        return this._userId;
    }
}