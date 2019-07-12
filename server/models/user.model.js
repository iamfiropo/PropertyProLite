import Model from './model';
import Users from '../db/users';
import Response from '../utils/helpers/response';
import Token from '../utils/helpers/jwt';

class User extends Model {
  async signUp() {
    try {
      const newUser = this.payload;
      const email = Users.some(user => user.email === newUser.email);
      if (!email) {
        newUser.token = await Token.userToken({ ...newUser.id, ...newUser.email });
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
    if (!obj) {
      return false;
    }
    obj.token = await Token.userToken({ ...obj.id, ...obj.email });
    this.result = obj;
    return true;
  }
}

export default User;
