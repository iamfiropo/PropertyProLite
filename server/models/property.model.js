import Model from './model';
import Properties from '../db/property';

class Property extends Model {
  async create() {
    const property = this.payload;
    await this.save(Properties, property);
  }
}

export default Property;
