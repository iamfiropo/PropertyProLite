import Response from '../utils/helpers/response';
import InputCheck from '../utils/helpers/inputcheck';

class UserValidation {
  static async signUp(req, res, next) {
    try {
      const {
        firstName, lastName, email, phoneNumber, address, password,
      } = req.body;
      if (!firstName || !lastName || !email || !phoneNumber || !address || !password) return Response.handleError(400, 'Please fill all the required fields', res);
      if (await InputCheck.nameCheck(firstName)) return Response.handleError(400, 'Enter valid first name', res);
      if (await InputCheck.nameCheck(lastName)) return Response.handleError(400, 'Enter valid last name', res);
      if (await InputCheck.emailCheck(email)) return Response.handleError(400, 'Enter valid email', res);
      if (await InputCheck.phoneNoCheck(phoneNumber)) return Response.handleError(400, 'Enter valid phone number', res);
      if (await InputCheck.addressCheck(address)) return Response.handleError(400, 'Enter valid address', res);
      if (await InputCheck.passwordCheck(password)) {
        return Response.handleError(400,
          'Your password should be 8 character or more and contains letters and numbers',
          res);
      }
      next();
    } catch (error) {
      return Response.handleError(500, error.toString(), res);
    }
  }

  static async signIn(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) return Response.handleError(400, 'Email is required', res);
      if (!password) return Response.handleError(400, 'Password is required', res);
      next();
    } catch (error) {
      return Response.handleError(500, error.toString(), res);
    }
  }
}

export default UserValidation;
