const mongoose = require('mongoose');
const Schema = mongoose.Schema;

class Env {

  /**
   * 
	 * @param {string} uri 
	 * @param {string} model 
   * @param {string} codebase 
	 * @param {string} envType
   */
  constructor(uri, model, codebase, envType) {
    this.uri = uri;
    this.model = model;
    this.codebase = codebase;
		this.envType = envType;
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
    const envObject = await Environments.findOne({ codebase: this.codebase, envType: this.envType });
		const envs = envObject.get('envs');

    Object.keys(envs).forEach(env => {
      process.env[env] = envs[env];
    })
    db.close();
    return true;
	}
}

module.exports = { Env }