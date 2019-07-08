class Model {
  constructor(payload) {
    this.payload = payload;
    this.result = null;
  }

  async save(db, obj) {
    db.push(obj);
    this.result = obj;
  }

  async deletePro(db, obj) {
    const index = obj - 1;
    db.splice(index, obj);
    this.result = { message: 'Deleted successfully' };
  }
}

export default Model;
