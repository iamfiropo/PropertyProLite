let check;

class Check {
  static checkName(name) {
    check = /[a-zA-Z]{3,}/;
    if (!check.test(name)) {
      return true;
    }
    return false;
  }

  static checkEmail(email) {
    check = /(^[a-zA-Z0-9_.]+@[a-zA-Z0-9-]+\.[a-z]+$)/;
    if (!check.test(email)) {
      return true;
    }
    return false;
  }

  static checkPhoneNo(phone_number) {
    check = /^[0]\d{10}$/;
    if (!check.test(phone_number)) {
      return true;
    }
    return false;
  }

  static checkAddress(address) {
    check = /^[a-zA-Z0-9\s,'-]*$/;
    if (!check.test(address)) {
      return true;
    }
    return false;
  }

  static checkPassword(password) {
    check = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!check.test(password)) {
      return true;
    }
    return false;
  }

  static checkFloat(float) {
    check = /^[+-]?\d+(\.\d+)?$/;
    if (!check.test(float)) {
      return true;
    }
    return false;
  }

  static checkToken(req) {
    const bearerHeader = req.headers.authorization;
    if (typeof bearerHeader === 'undefined' || bearerHeader === '') return false;
    const bearer = bearerHeader.split(' ')[1];
    return bearer;
  }
}

export default Check;
