import Model from './model';
import Users from '../db/users';

class User extends Model {
  async signUp() {
    const newUser = this.payload;
    const email = Users.some(user => user.email === newUser.email);
    if (!email) {
      await this.save(Users, newUser);
      return true;
    }
    return false;
  }

  async signIn() {
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
