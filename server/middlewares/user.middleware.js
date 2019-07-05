import Response from '../utils/helpers/response';
import InputCheck from '../utils/helpers/input.check';

class UserValidation {
  static async signUp(req, res, next) {
    try {
      const {
        firstName, lastName, email, phoneNumber, address, password,
      } = req.body;
      if (!firstName || !lastName || !email || !phoneNumber || !address || !password) {
        Response.handleError(400, 'Please fill all the required fields', res);
      }
      if (await InputCheck.nameCheck(firstName)) {
        Response.handleError(400, 'Enter valid first name', res);
      }
      if (await InputCheck.nameCheck(lastName)) {
        Response.handleError(400, 'Enter valid last name', res);
      }
      if (await InputCheck.emailCheck(email)) {
        Response.handleError(400, 'Enter valid email', res);
      }
      if (await InputCheck.phoneNoCheck(phoneNumber)) {
        Response.handleError(400, 'Enter valid phone number', res);
      }
      if (await InputCheck.addressCheck(address)) {
        Response.handleError(400, 'Enter valid address', res);
      }
      if (await InputCheck.passwordCheck(password)) {
        Response.handleError(400,
          'Your password should be 8 character or more and contains letters and numbers',
          res);
      }
      next();
    } catch (error) {
      Response.handleError(500, error.toString(), res);
    }
  }

  static async signIn(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        Response.handleError(400, 'Please fill all the required fields', res);
      }
      if (await InputCheck.emailCheck(email)) {
        Response.handleError(400, 'Enter valid email', res);
      }
      if (await InputCheck.passwordCheck(password)) {
        Response.handleError(400, 'Enter valid password', res);
      }
      next();
    } catch (error) {
      Response.handleError(500, error.toString(), res);
    }
  }
}

export default UserValidation;
