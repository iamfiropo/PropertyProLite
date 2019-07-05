import Response from '../utils/helpers/response';
import InputCheck from '../utils/helpers/input.check';

class PropertyValidation {
  static async property(req, res, next) {
    try {
      const {
        price, state, city, address,
      } = req.body;
      if (!price || !state || !city || !address) {
        Response.handleError(400, 'Please fill all the required fields', res);
      }
      if (await InputCheck.floatCheck(price)) Response.handleError(400, 'Enter valid price in numeric', res);
      if (await InputCheck.nameCheck(state)) Response.handleError(400, 'Enter valid state', res);
      if (await InputCheck.nameCheck(city)) Response.handleError(400, 'Enter valid city', res);
      if (await InputCheck.addressCheck(address)) Response.handleError(400, 'Enter valid address', res);
      next();
    } catch (error) {
      Response.handleError(500, error.toString(), res);
    }
  }
}

export default PropertyValidation;
