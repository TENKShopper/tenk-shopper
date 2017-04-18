'use strict'

// bcrypt docs: https://www.npmjs.com/package/bcrypt
const bcrypt = require('bcryptjs')
    , {BOOLEAN, STRING, VIRTUAL} = require('sequelize')

const accountInfo = {
  userName: STRING,
  email: {
    type: STRING,
    defaultValue: null,
    validate: {
      isEmail: true,
    }
  },
  isAdmin: {
    type: BOOLEAN,
    defaultValue: false
  },
  creditCard: {
    type: STRING,
    validate: {
      isCreditCard: true
    }
  }
  // We support oauth, so users may or may not have passwords.
  password_digest: STRING, // This column stores the hashed password in the DB, via the beforeCreate/beforeUpdate hooks
  password: VIRTUAL // Note that this is a virtual, and not actually stored in DB
}

const shippingAddress = {
  shippingFirstName: STRING,
  shippingLastName: STRING,
  shippingCity: STRING,
  shippingState: STRING,
  shippingZip: STRING,
  shippingPostal: STRING,
}

const billingAddress = {
  billingFirstName: STRING,
  billingLastName: STRING,
  billingCity: STRING,
  billingState: STRING,
  billingZip: STRING,
  billingPostal: STRING,
}

const optionMethods = {
  indexes: [{fields: ['email'], unique: true}],
  hooks: {
    beforeCreate: setEmailAndPassword,
    beforeUpdate: setEmailAndPassword,
  },
  getterMethods: {
    // checks if user is a guest or not
    isGuest () {
      return this.email ? false : true
    },
    getShippingAddress () {
      return {shippingFirstName, shippingLastName, shippingCity, shippingState, shippingZip, shippingPostal} = this
    }
    getBillingAddress () {
      return {billingFirstName, billingLastName, billingCity, billingState, billingZip, billingPostal, creditCard} = this
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
    }
  }
}

module.exports = db => db.define('users',
  Object.assign(accountInfo, shippingAddress, billingAddress),
  optionMethods
)

module.exports.associations = (User, {OAuth, Review, Order}) => {
  User.hasOne(OAuth)
  User.hasMany(Review)
  User.hasMany(Order)
}

function setEmailAndPassword(user) {
  if(!user.isGuest) return;
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
