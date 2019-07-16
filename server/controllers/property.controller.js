import Response from '../utils/helpers/response';
import Id from '../utils/helpers/id';
import Data from '../db/property';
import PropertyModel from '../models/property.model';

class PropertyController {
  static async create(req, res) {
    try {
      console.log('*****create*****', req.body);
      const property = req.body;
      const newId = Id(Data);
      property.id = newId;
      property.owner = res.locals.user.id;
      property.created_on = new Date();
      property.owner_email = res.locals.user.email;
      property.owner_phone_number = res.locals.user.phone_number;
      const newProperty = new PropertyModel({ ...property });
      newProperty.create();
      return Response.handleSuccess(201, 'Successfully Created', newProperty.result, res);
    } catch (error) {
      return Response.handleError(500, error.toString(), res);
    }
  }

  static async findAll(req, res) {
    try {
      const listOfProperties = await PropertyModel.findAll();
      if (listOfProperties) {
        return Response.handleSuccess(200, 'Got all property adverts successfully', listOfProperties, res);
      }
      return Response.handleError(404, 'No property found', res);
    } catch (error) {
      return Response.handleError(500, error.toString(), res);
    }
  }

  static async findOne(req, res) {
    try {
      const property_id = parseInt(req.params.property_id, 10);
      const property = new PropertyModel(property_id);
      if (await property.findOne()) return Response.handleSuccess(200, 'Got the specific property advert successfully', property.result, res);
      return Response.handleError(404, 'Property not found', res);
    } catch (error) {
      return Response.handleError(500, error.toString(), res);
    }
  }

  static async findByType(req, res) {
    try {
      const { type } = req.query;
      const property = new PropertyModel(type);
      if (await property.findByType()) return Response.handleSuccess(200, 'Got the property type successfully', property.result, res);
      return Response.handleError(404, 'Property type not found, check the property type query value', res);
    } catch (error) {
      return Response.handleError(500, error.toString(), res);
    }
  }

  static async update(req, res) {
    try {
      console.log('*****update*****', req.params);
      const property_id = parseInt(req.params.property_id, 10);
      const newProperty = req.body;
      newProperty.id = property_id;
      const property = new PropertyModel({ ...newProperty });
      await property.updateProperty();
      return Response.handleSuccess(200, 'Updated Successfully', property.result, res);
    } catch (error) {
      return Response.handleError(500, error.toString(), res);
    }
  }

  static async markSold(req, res) {
    try {
      console.log('*****marksold*****', req.params);
      const id = parseInt(req.params.property_id, 10);
      const soldProperty = { status: 'sold' };
      const property = new PropertyModel({ id, ...soldProperty });
      await property.updateProperty();
      return Response.handleSuccess(200, 'Mark as sold successfully', property.result, res);
    } catch (error) {
      return Response.handleError(500, error.toString(), res);
    }
  }

  static async delete(req, res) {
    try {
      const is_admin = res.locals.user.is_admin;
      // if (!is_admin) return Response.handleError(403, '!!!You do not have access to this endpoint', res);
      const property_id = parseInt(req.params.property_id, 10);
      const property = new PropertyModel(property_id);
      if (await property.deleteProperty()) return Response.handleDelete(200, property.result, res);
      return Response.handleError(404, 'Property id not found', res);
    } catch (error) {
      return Response.handleError(500, error.toString(), res);
    }
  }
}

export default PropertyController;
