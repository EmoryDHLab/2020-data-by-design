const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const notebookTypes = require('dxd-common').notebookTypes;

const { Schema } = mongoose;

console.log(notebookTypes);

const NotebookSchema = new Schema({
  html: String,
  notebookId: Number,
  metadata: String,
  type: {
    type: Number,
    validator: {
      validate (value) {
        return Object.values(notebookTypes).includes(value);
      },
      message: "{PATH} was {VALUE} but must be a value of the notebookTypes enum"
    },
    required: true
  },
  data: Object,
  attachedId: Number
})
const UsersSchema = new Schema({
  email: String,
  name: String,
  hash: String,
  salt: String,
  notebook: [NotebookSchema]
});

UsersSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UsersSchema.methods.validatePassword = function(password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
};

UsersSchema.methods.generateJWT = function() {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign({
    email: this.email,
    id: this._id,
    exp: parseInt(expirationDate.getTime() / 1000, 10),
  }, 'secret');
}

UsersSchema.methods.toAuthJSON = function() {
  return {
    _id: this._id,
    email: this.email,
    name: this.name,
    notebook: this.notebook,
    token: this.generateJWT(),
  };
};

UsersSchema.methods.notebookJSON = function() {
  return {notebook: this.notebook};
};

module.exports = mongoose.model('Users', UsersSchema);
