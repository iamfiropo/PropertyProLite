class Model {
  constructor(payload) {
    this.payload = payload;
    this.result = null;
  }

  async save(db, obj) {
    db.push(obj);
    this.result = obj;
  }
}

export default Model;
