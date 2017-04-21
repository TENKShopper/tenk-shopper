const {BOOLEAN, STRING, VIRTUAL} = require('sequelize')

module.exports = db => db.define('addresses', {
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
}, {
  getterMethods: {
    fullName: function() {
      return this.firstName + ' ' + this.lastName
    }
  }
})

module.exports.associations = (User, {OAuth, Review, Order, Address}) => {
  Address.belongsTo(User)
}
