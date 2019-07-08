import Response from '../utils/helpers/response';
import Id from '../utils/helpers/id';
import Data from '../db/property';
import PropertyModel from '../models/property.model';

class PropertyController {
  static async create(req, res) {
    try {
      const property = req.body;
      const newId = Id(Data);
      property.id = newId;
      // property.owner = res.locals.user;
      property.owner = 1;
      property.created_on = new Date();
      const newProperty = new PropertyModel({ ...property });
      newProperty.create();
      return Response.handleSuccess(201, 'Successfully Created', newProperty.result, res);
    } catch (error) {
      return Response.handleError(500, error.toString(), res);
    }
  }

  static async findAll(req, res) {
    try {
      const listOfProperty = await PropertyModel.findAll();
      return Response.handleSuccess(200, 'Got all property adverts successfully', listOfProperty, res);
    } catch (error) {
      return Response.handleError(500, error.toString(), res);
    }
  }

  static async findOne(req, res) {
    try {
      const propertyId = parseInt(req.params.id, 10);
      const property = new PropertyModel(propertyId);
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

  static async deleteProperty(req, res) {
    try {
      const propertyId = parseInt(req.params.id, 10);
      const property = new PropertyModel(propertyId);
      if (await property.deleteProperty()) return Response.handleDelete(200, property.result, res);
      return Response.handleError(404, 'Property id not found', res);
    } catch (error) {
      return Response.handleError(500, error.toString(), res);
    }
  }
}

export default PropertyController;
