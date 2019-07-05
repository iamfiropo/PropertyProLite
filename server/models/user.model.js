import Model from './model';
import Users from '../db/users';
import Response from '../utils/helpers/response';

class User extends Model {
  async signUp() {
    /**
     * Check if email already exist before saving into the database
     * If it does, return false
     */
    try {
      const newUser = this.payload;
      const email = Users.some(user => user.email === newUser.email);
      if (!email) {
        await this.save(Users, newUser);
        return true;
      }
      return false;
    } catch (error) {
      return Response.handleError(500, error.toString());
    }
  }

  async signIn() {
    /**
     * Check if user exist in the database
     * If it does, return the user
     */
    const signInUser = this.payload;
    const obj = Users.find((user) => {
      if (user.email === signInUser) {
        return user;
      }
      return false;
    });
    if (!obj) {
      return false;
    }
    this.result = obj;
    return true;
  }
}

export default User;
