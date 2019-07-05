import bcrypt from 'bcrypt';
import Response from '../utils/helpers/response';
import Id from '../utils/helpers/id';
import Users from '../db/users';
import UserModel from '../models/user.model';

class userController {
  static async signUp(req, res) {
    try {
      const newUser = req.body;
      const hashedPassword = bcrypt.hashSync(newUser.password, bcrypt.genSaltSync(10), null);
      newUser.password = hashedPassword;
      const newId = Id(Users);
      newUser.id = newId;
      const user = new UserModel({ ...newUser });
      if (!await user.signUp()) {
        return Response.handleError(409, 'Email already exist', res);
      }
      return Response.handleSuccess(201, 'Successfully Created', user.result, res);
    } catch (error) {
      return Response.handleError(500, error.toString(), res);
    }
  }

  static async signIn(req, res) {
    try {
      const { email, password } = req.body;
      const signInUser = new UserModel(email);
      if (signInUser.signIn()) {
        if (bcrypt.compareSync(password, signInUser.result.password)) {
          return Response.handleSuccess(200, 'User sign in successfully', signInUser.result.password, res);
        }
        return Response.handleError(401, 'Wrong password. Please try again', res);
      }
    } catch (error) {
      return Response.handleError(404, 'Sorry, we don\'t recognize this email', res);
    }
  }
}

export default userController;
