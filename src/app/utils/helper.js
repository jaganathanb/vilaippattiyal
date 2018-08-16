export default class Helper {
  static getLogginUser() {
    return JSON.parse(localStorage.getItem('user') || null);
  }
}
