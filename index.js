const mongoose = require('mongoose');
const Schema = mongoose.Schema;

class Env {

  /**
   * 
   * @param {string} codebase 
   * @param {string} uri 
   * @param {string} model 
   */
  constructor(codebase, uri, model) {
    this.codebase = codebase;
    this.uri = uri;
    this.model = model;
  }

	async build() {
    let db;
		try {
			db = await mongoose.createConnection(this.uri, {
				useNewUrlParser: true,
				useCreateIndex: true,
				useFindAndModify: false,
				useUnifiedTopology: true
			});
			console.log('Env DB connected');
		} catch (error) {
			console.log(`Env DB connection error: ${error.message}`);
		}

		const schema = new Schema(
			{
				any: {}
			},
			{
				strict: false
			}
		);
		const Environments = db.model(this.model, schema);
    const envObject = await Environments.findOne({ CODEBASE: this.codebase });
    Object.keys(envObject).forEach(env => {
      process.env[env] = envObject[env];
    })
    db.close();
    return true;
	}
}

module.exports = { Env }