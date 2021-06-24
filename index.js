const mongoose = require('mongoose');
const Schema = mongoose.Schema;

class Env {

  constructor(codebase, uri) {
    this.codebase = codebase;
    this.uri = uri;
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
		const Environments = db.model('environments', schema);
    const envObject = await Environments.findOne({ CODEBASE: this.codebase });
    Object.keys(envObject).forEach(env => {
      process.env[env] = envObject[env];
    })
    db.close();
    return true;
	}
}

module.exports = { Env }