import moment from 'moment';
import Response from '../utils/helpers/response';
import db from '../models/index';
import Upload from '../config/cloudinary';

class PropertyController {
  static async create(req, res) {
    try {
      const createQuery = `INSERT INTO
        property (owner, status, price, state, city, address, type, created_on, image_url, owner_email, owner_phone_number)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`;
      const property = req.body;
      let { type } = property;
      const {
        price, state, city, address,
      } = property;
      property.image_url = await Upload.uploadFile(req);
      property.owner = res.locals.user.id;
      property.status = 'available';
      property.created_on = moment(new Date());
      property.owner_email = res.locals.user.email;
      property.owner_phone_number = res.locals.user.phone_number;
      type = type.toLowerCase().trim();
      const values = [
        property.owner, property.status, price, state, city, address, type,
        property.created_on, property.image_url, property.owner_email, property.owner_phone_number
      ];
      const { rows } = await db.query(createQuery, values);
      return Response.handleSuccess(201, 'Successfully Created', rows[0], res);
    } catch (error) {
      return Response.handleError(500, error.toString(), res);
    }
  }

  static async findAll(req, res) {
    try {
      const selectQuery = 'SELECT * FROM property WHERE owner = $1';
      const owner = res.locals.user.id;
      const { rows, rowCount } = await db.query(selectQuery, [owner]);
      if (rowCount !== 0) {
        return Response.handleSuccess(200, 'Got all property adverts successfully', rows, res);
      }
      return Response.handleError(404, 'No property found', res);
    } catch (error) {
      return Response.handleError(500, error.toString(), res);
    }
  }

  static async findOne(req, res) {
    try {
      const selectQuery = 'SELECT * FROM property WHERE id = $1 AND owner = $2';
      const owner = res.locals.user.id;
      const id = parseInt(req.params.property_id, 10);
      const values = [id, owner];
      const { rows, rowCount } = await db.query(selectQuery, values);
      if (rowCount !== 0) {
        return Response.handleSuccess(200, 'Got the specific property advert successfully', rows[0], res);
      }
      return Response.handleError(404, 'Property not found', res);
    } catch (error) {
      return Response.handleError(500, error.toString(), res);
    }
  }

  static async findByType(req, res) {
    try {
      const selectQuery = 'SELECT * FROM property WHERE type = $1 AND owner = $2';
      const owner = res.locals.user.id;
      let { type } = req.query;
      type = type.toLowerCase().trim();
      const values = [type, owner];
      const { rows, rowCount } = await db.query(selectQuery, values);
      if (rowCount !== 0) {
        return Response.handleSuccess(200, 'Got the property type successfully', rows, res);
      }
      return Response.handleError(404, 'Property type not found. Check the property type query value', res);
    } catch (error) {
      return Response.handleError(500, error.toString(), res);
    }
  }

  static async update(req, res) {
    try {
      const findOneQuery = 'SELECT * FROM property WHERE id = $1 AND owner = $2';
      const updateQuery = `UPDATE property 
        SET price = $1, state = $2, city = $3, address = $4, type = $5, image_url = $6
        WHERE id = $7 AND owner = $8 RETURNING *`;
      const owner = res.locals.user.id;
      const id = parseInt(req.params.property_id, 10);
      let values = [id, owner];
      const { rows, rowCount } = await db.query(findOneQuery, values);
      if (rowCount === 0) {
        return Response.handleError(404, 'Property not found', res);
      }
      const property = req.body;
      property.image_url = await Upload.uploadFile(req);
      values = [
        property.price || rows[0].price,
        property.state || rows[0].state,
        property.city || rows[0].city,
        property.address || rows[0].address,
        property.type || rows[0].type,
        property.image_url || rows[0].image_url,
        rows[0].id,
        rows[0].owner
      ];
      const response = await db.query(updateQuery, values);
      return Response.handleSuccess(200, 'Updated Successfully', response.rows[0], res);
    } catch (error) {
      return Response.handleError(500, error.toString(), res);
    }
  }

  static async markSold(req, res) {
    try {
      const updateOneQuery = `UPDATE property 
        SET status = $1
        WHERE id = $2 AND owner = $3 RETURNING *`;
      const id = parseInt(req.params.property_id, 10);
      const owner = res.locals.user.id;
      const status = 'sold';
      const values = [status, id, owner];
      const { rows, rowCount } = await db.query(updateOneQuery, values);
      if (rowCount === 0) {
        return Response.handleError(404, 'Property not found', res);
      }
      return Response.handleSuccess(200, 'Mark as sold successfully', rows, res);
    } catch (error) {
      return Response.handleError(500, error.toString(), res);
    }
  }

  static async delete(req, res) {
    /**
     * Use like success response message
     * Response.handleError(200, result, res)
     */
    try {
      const deleteQuery = `DELETE FROM property WHERE id = $1 AND owner = $2
                            RETURNING *`;
      const is_admin = res.locals.user.is_admin;
      const owner = res.locals.user.id;
      if (!is_admin) return Response.handleError(403, 'You do not have access to this endpoint!!!', res);
      const id = parseInt(req.params.property_id, 10);
      const values = [id, owner];
      const { rowCount } = await db.query(deleteQuery, values);
      const result = { message: 'Deleted successfully' };
      if (rowCount !== 0) {
        return Response.handleError(200, result, res);
      }
      return Response.handleError(404, 'Property id not found', res);
    } catch (error) {
      return Response.handleError(500, error.toString(), res);
    }
  }
}

export default PropertyController;
