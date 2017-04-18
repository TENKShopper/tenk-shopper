'use strict'
const Address = require('./address.js')

// bcrypt docs: https://www.npmjs.com/package/bcrypt
const bcrypt = require('bcryptjs')
    , {BOOLEAN, STRING, VIRTUAL} = require('sequelize')

const userSchema = {
  userName: STRING,
  email: {
    type: STRING,
    unique: true,
    validate: {
      isEmail: true,
    }
  },
  isAdmin: {
    type: BOOLEAN,
    defaultValue: false
  },
  // We support oauth, so users may or may not have passwords.
  password_digest: STRING, // This column stores the hashed password in the DB, via the beforeCreate/beforeUpdate hooks
  password: VIRTUAL // Note that this is a virtual, and not actually stored in DB
}

const optionMethods = {
  indexes: [{fields: ['email'], unique: true}],
  hooks: {
    beforeCreate: setEmailAndPassword,
    beforeUpdate: setEmailAndPassword,
  },

  getterMethods: {
    // checks if user is a guest or not
    isGuest: function() {
      return this.password ? false: true
    }
  },
  instanceMethods: {
    // This method is a Promisified bcrypt.compare
    authenticate(plaintext) {
      return new Promise((resolve, reject) =>
        bcrypt.compare(plaintext, this.password_digest,
          (err, result) =>
            err ? reject(err) : resolve(result))
        )
    },
  }
}

module.exports = db => db.define('users',
  userSchema,
  optionMethods
)

module.exports.associations = (User, {OAuth, Review, Order, Address}) => {
  User.hasOne(OAuth)
  User.hasMany(Review)
  User.hasMany(Order)
  User.hasMany(Address, {as: 'shippingInfo'})
  User.hasMany(Address, {as: 'billingInfo'})
}

function setEmailAndPassword(user) {
  user.email = user.email && user.email.toLowerCase()
  if (!user.password) return Promise.resolve(user)

  return new Promise((resolve, reject) =>
    bcrypt.hash(user.get('password'), 10, (err, hash) => {
      if (err) return reject(err)
      user.set('password_digest', hash)
      resolve(user)
    })
  )
}

function maxLength (value) {

}
