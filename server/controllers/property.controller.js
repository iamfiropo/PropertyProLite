import Response from '../utils/helpers/response';
import Id from '../utils/helpers/id';
import Properties from '../db/property';
import PropertyModel from '../models/property.model';

class PropertyController {
  static async create(req, res) {
    try {
      const property = req.body;
      const newId = Id(Properties);
      property.id = newId;
      // property.owner = res.locals.user;
      property.owner = 1;
      property.createdOn = new Date();
      const newProperty = new PropertyModel({ ...property });
      newProperty.create();
      return Response.handleSuccess(201, 'Successfully Created', newProperty.result, res);
    } catch (error) {
      return Response.handleError(500, error.toString(), res);
    }
  }
}

export default PropertyController;
