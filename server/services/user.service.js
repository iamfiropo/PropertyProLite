import Users from '../db/users';

class UserService {
  static addUserID(user) {
    const newId = Users.length + 1;
    user.id = newId;
    return user;
  }
}
export default UserService;
