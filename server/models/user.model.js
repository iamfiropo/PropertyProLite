import Model from './model';
import Users from '../db/users';
import Response from '../utils/helpers/response';
import Token from '../config/jwt';

class User extends Model {
  async signUp() {
    try {
      const newUser = this.payload;
      const {
        id,
        email,
        is_admin,
        phone_number,
      } = newUser;
      const obj = Users.some(user => user.email === email);
      if (!obj) {
        newUser.token = await Token.userToken({
          id,
          email,
          is_admin,
          phone_number,
        });
        await this.save(Users, newUser);
        return true;
      }
      return false;
    } catch (error) {
      return Response.handleError(500, error.toString());
    }
  }

  async signIn() {
    const email = this.payload;
    const obj = Users.find(user => user.email === email);
    const id = obj.id;
    const is_admin = obj.is_admin;
    const phone_number = obj.phone_number;
    if (!obj) {
      return false;
    }
    obj.token = await Token.userToken({
      id,
      email,
      is_admin,
      phone_number,
    });
    this.result = obj;
    return true;
  }
}

export default User;
