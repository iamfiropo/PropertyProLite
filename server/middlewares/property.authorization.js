import Response from '../utils/helpers/response';
import Check from '../utils/helpers/check';
import Data from '../db/property';

class PropertyValidation {
  static async create(req, res, next) {
    try {
      // const is_admin = res.locals.user.is_admin;
      const {
        price, state, city, address, token, type, image_url,
      } = req.body;
      // if (!is_admin) return Response.handleError(403, '!!!You do not have access to this endpoint', res);
      if (!price || !state || !city || !address || !token || !type || !image_url) {
        return Response.handleError(400, 'Please fill all the required fields', res);
      }
      // if (await Check.checkFloat(price)) return Response.handleError(400, 'Enter valid price in numeric', res);
      // if (await Check.checkName(state)) return Response.handleError(400, 'Enter valid state', res);
      // if (await Check.checkName(city)) return Response.handleError(400, 'Enter valid city', res);
      // if (await Check.checkAddress(address)) return Response.handleError(400, 'Enter valid address', res);
      next();
    } catch (error) {
      return Response.handleError(500, error.toString(), res);
    }
  }

  static async findByType(req, res, next) {
    try {
      // const { type } = req.query;
      // if (!type) return Response.handleError(400, 'No valid query detected e.g properties?type=duplex', res);
      next();
    } catch (error) {
      return Response.handleError(500, error.toString(), res);
    }
  }

  static async update(req, res, next) {
    try {
      const is_admin = res.locals.user.is_admin;
      const property_id = parseInt(req.params.property_id, 10);
      const {
        price, state, city, address,
      } = req.body;
      // if (!is_admin) return Response.handleError(403, '!!!You do not have access to this endpoint', res);
      // const id = Data.some(data => data.id === property_id);
      // if (!id) {
      //   return Response.handleError(404, 'Property id not found', res);
      // }
      // if (await Check.checkFloat(price)) return Response.handleError(400, 'Enter valid price in numeric', res);
      // if (await Check.checkName(state)) return Response.handleError(400, 'Enter valid state', res);
      // if (await Check.checkName(city)) return Response.handleError(400, 'Enter valid city', res);
      // if (await Check.checkAddress(address)) return Response.handleError(400, 'Enter valid address', res);
      next();
    } catch (error) {
      return Response.handleError(500, error.toString(), res);
    }
  }

  static async markSold(req, res, next) {
    try {
      const is_admin = res.locals.user.is_admin;
      const property_id = parseInt(req.params.property_id, 10);
      // if (!is_admin) return Response.handleError(403, '!!!You do not have access to this endpoint', res);
      // const id = Data.some(data => data.id === property_id);
      // if (!id) {
      //   return Response.handleError(404, 'Property id not found', res);
      // }
      next();
    } catch (error) {
      return Response.handleError(500, error.toString(), res);
    }
  }
}

export default PropertyValidation;
