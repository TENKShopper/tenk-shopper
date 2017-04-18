const {BOOLEAN, STRING, VIRTUAL} = require('sequelize')

const addressSchema = {
  country: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  firstName: {
    type: STRING
  },
  lastName: {
    type: STRING
  },
  administrativeArea: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  locality: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  postalZipCode: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  streetAddress: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  premise: {
    type: STRING
  }
}

const optionMethods = {
  getterMethods: {
    fullName: function() {
      return this.firstName + ' ' + this.lastName
    }
  }
}

module.exports = db => db.define('addresses',
  addressSchema,
  optionMethods
)
