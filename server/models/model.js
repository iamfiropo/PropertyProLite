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
    this.result.id = response[0].id;
    // console.log('*********del**********', this.data);
    return this.result;
  }

  async update(db, obj) {
    const index = obj.id - 1;
    this.result = db.splice(index, 1, Object.assign(db[index], obj));
  }
}

export default Model;
