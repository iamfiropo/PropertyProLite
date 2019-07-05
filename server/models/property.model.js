import Model from './model';
import Properties from '../db/property';
import Response from '../utils/helpers/response';

class Property extends Model {
  async create() {
    try {
      const property = this.payload;
      await this.save(Properties, property);
    } catch (error) {
      return Response.handleError(500, error.toString());
    }
  }
}

export default Property;
