class Model {
  constructor(payload) {
    this.payload = payload;
    this.result = null;
  }

  async save(db, obj) {
    db.push(obj);
    this.result = obj;
  }

  async deletePro(db, id) {
    const index = id - 1;
    const response = db.splice(index, 1);
    this.result = { message: 'Deleted successfully' };
    return this.result;
  }

  async update(db, obj) {
    const index = obj.id - 1;
    const newObj = db.splice(index, 1, Object.assign(db[index], obj));
    newObj.created_on = new Date();
    this.result = newObj;
  }
}

export default Model;
