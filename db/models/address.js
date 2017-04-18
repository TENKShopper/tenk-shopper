const {BOOLEAN, STRING, VIRTUAL} = require('sequelize')

const addressSchema = {
  country: {
    type: STRING,
    allowNull: false,
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
  },
  locality: {
    type: STRING,
    allowNull: false,
  },
  postalZipCode: {
    type: STRING,
    allowNull: false,
  },
  streetAddress: {
    type: STRING,
    allowNull: false,
  },
  premise: {
    type: STRING
  }
}

const optionMethods = {
  getterMethods: {
    fullName: function () {
      //gets fullname
      return this.firstName + ' ' + this.lastName
    }
  }
}

module.exports = db => db.define('addresses',
  addressSchema,
  optionMethods
)
