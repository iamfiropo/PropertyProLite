import Response from '../utils/helpers/response';
import Check from '../utils/helpers/check';

class UserValidation {
  static async signUp(req, res, next) {
    try {
      const {
        first_name, last_name, email, phone_number, address, password, is_admin,
      } = req.body;
      // if (!first_name || !last_name || !email || !phone_number
      //   || !address || !password || is_admin === undefined) {
      //   return Response.handleError(400, 'Please fill all the required fields', res);
      // }
      if (!first_name || !last_name || !email || !phone_number
        || !address || !password) {
        return Response.handleError(400, 'Please fill all the required fields', res);
      }
      // if (await Check.checkName(first_name)) return Response.handleError(400, 'Enter valid first name', res);
      // if (await Check.checkName(last_name)) return Response.handleError(400, 'Enter valid last name', res);
      // if (await Check.checkEmail(email)) return Response.handleError(400, 'Enter valid email', res);
      // if (await Check.checkPhoneNo(phone_number)) return Response.handleError(400, 'Enter valid phone number', res);
      // if (await Check.checkAddress(address)) return Response.handleError(400, 'Enter valid address', res);
      // if (await Check.checkPassword(password)) {
      //   return Response.handleError(400,
      //     'Your password should be 8 character or more and contains letters and numbers',
      //     res);
      // }
      next();
    } catch (error) {
      return Response.handleError(500, error.toString(), res);
    }
  }

  static async signIn(req, res, next) {
    try {
      const { email, password } = req.body;
      // if (!email || !password) {
      //   return Response.handleError(400, 'Please fill all the required fields', res);
      // }
      // if (await Check.checkEmail(email)) return Response.handleError(400, 'Enter valid email', res);
      // if (await Check.checkPassword(password)) return Response.handleError(400, 'Enter valid password', res);
      next();
    } catch (error) {
      return Response.handleError(500, error.toString(), res);
    }
  }
}

export default UserValidation;
