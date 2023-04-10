export default class UserInfo {
  constructor({ userName, userJob, avatarPic }) {
    this._userName = userName;
    this._userJob = userJob;
    this._avatarPic = avatarPic;
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      about: this._userJob.textContent,
      avatar: this._avatarPic.src,
    };
  }

  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userJob.textContent = data.about;
    this._avatarPic.src = data.avatar;
  }
}
