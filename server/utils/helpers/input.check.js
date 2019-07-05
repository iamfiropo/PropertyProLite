let check;

class InputCheck {
  static nameCheck(name) {
    check = /[a-zA-Z]{3,}/;
    if (!check.test(name)) {
      return true;
    }
    return false;
  }

  static emailCheck(email) {
    check = /(^[a-zA-Z0-9_.]+@[a-zA-Z0-9-]+\.[a-z]+$)/;
    if (!check.test(email)) {
      return true;
    }
    return false;
  }

  static phoneNoCheck(phoneNumber) {
    check = /^[0]\d{10}$/;
    if (!check.test(phoneNumber)) {
      return true;
    }
    return false;
  }

  static addressCheck(address) {
    check = /^[a-zA-Z0-9\s,'-]*$/;
    if (!check.test(address)) {
      return true;
    }
    return false;
  }

  static passwordCheck(password) {
    check = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!check.test(password)) {
      return true;
    }
    return false;
  }

  static floatCheck(float) {
    check = /^[+-]?\d+(\.\d+)?$/;
    if (!check.test(float)) {
      return true;
    }
    return false;
  }
}
export default InputCheck;
