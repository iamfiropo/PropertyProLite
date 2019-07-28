import Model from './model';
import Response from '../utils/helpers/response';
import Token from '../config/jwt';
import db from './index';

class User extends Model {
  async signUp() {
    const createQuery = `INSERT INTO
    users (email, first_name, last_name, password, phone_number, address, is_admin)
    VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`;

    let { email } = this.payload;
    const {
      is_admin, phone_number, first_name, last_name, password, address,
    } = this.payload;

    email = email.toLowerCase();
    const values = [email, first_name, last_name, password, phone_number, address, is_admin];

    try {
      const { rows } = await db.query(createQuery, values);
      const obj = rows[0];
      const id = obj.id;
      rows[0].token = await Token.userToken({
        id, email, is_admin, phone_number,
      });

      this.result = rows[0];
      return this.result;
    } catch (error) {
      if (error.code === '23505') {
        return false;
      }
      return Response.handleError(500, error.toString());
    }
  }

  async signIn() {
    const selectQuery = 'SELECT * FROM users WHERE email = $1';
    let email = this.payload;
    email = email.toLowerCase();
    const { rows, rowCount } = await db.query(selectQuery, [email]);
    if (rowCount === 0) {
      return false;
    }
    const obj = rows[0];
    const id = obj.id;
    const is_admin = obj.is_admin;
    const phone_number = obj.phone_number;
    obj.token = await Token.userToken({
      id, email, is_admin, phone_number,
    });
    this.result = obj;
    return true;
  }
}

export default User;
