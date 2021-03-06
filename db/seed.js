'use strict'

const db = require('APP/db')
    , {User, Address, Product, Promise} = db
    , {mapValues} = require('lodash')

function seedEverything() {
  const seeded = {
    users: users(),
    addresses: addresses(),
    product: product(),
  }

  // seeded.favorites = favorites(seeded)

  return Promise.props(seeded)
}

/* --------- USERS SEED DATA ----------- */

const names = ['Tina', 'Emily', 'Nate', 'Kido', 'Omri', 'Ian', 'John']
function createUser() {
  const name = names.shift()
  const user = name + `${Math.floor(Math.random() * 100)}`
  return {
    userName: name,
    email: `${user}@${name}.com`,
    password: '123',
    isAdmin: Math.floor(Math.random() * 2) === 0
  }
}

function createUserList() {
  const userList = {}
  for (let i = 0; i < 5; i++) {
    userList[i] = createUser()
  }

  return userList
}

const users = seed(User, createUserList())
// Name of user does not match name of address

/* --------- ADDRESS SEED DATA ----------- */

const addressNames= ['Tina', 'Emily', 'Nate', 'Kido', 'Omri', 'Ian', 'John']
const country = ['US', 'JP', 'EN']
const administrativeArea = ['NY', 'CA', 'CT', 'NJ', 'Tokyo']
const locality = ['NY', 'LA', 'Hartford', 'Hoboken', 'Shibuya']
const postalZipCode = ['123', '234', '345']
const streetAddress = ['25 Senate Pl', 'Daizawa 3-10-15', '15 Williams St', '103rd 13W', '5 Hanover St']

function createAddress() {
  const name = addressNames.shift()
  return {
    country: country[Math.floor(Math.random()*country.length)],
    firstName: name,
    lastName: name,
    administrativeArea: administrativeArea[Math.floor(Math.random()*administrativeArea.length)],
    locality: locality[Math.floor(Math.random()*locality.length)],
    postalZipCode: postalZipCode[Math.floor(Math.random()*postalZipCode.length)],
    streetAddress: streetAddress[Math.floor(Math.random()* streetAddress.length)]
  }
}

function createAddressList() {
  const addressList = {}
  for (let i = 0; i < 5; i++) {
    addressList[i] = createAddress()
  }

  return addressList
}

const addresses = seed(Address, createAddressList())


/* --------- PRODUCTS SEED DATA ----------- */

const products = {
  Shirts: ['HIGH NECK HALF SLEEVE T-SHIRT', 'DRY YOGA SHORT-SLEEVE T-SHIRT', 'EXTRA FINE MERINO V-NECK CARDIGAN', 'PEANUTS SHORT-SLEEVE GRAPHIC TEE', 'EASY CARE OXFORD LONG SLEEVE SHIRT'],
  Pants: ['RELAXED ANKLE PANTS', 'SKINNY STRAIGHT JEANS', 'AIRISM PILE LINED LOUNGE SHORTS'],
  Shoes: ['DISNEY MAROON SLIPPERS', 'NIKE AIR MAX 90 ULTRA 2.0 BREATHE']
}
const descriptions = ['is fabulous!', 'is great for any occasion.', 'is binary', 'is classy and elegant.', 'features a soft, fluffy feel!', 'has a gently snug, relaxed fit', 'is ideal for relaxing at home.']
const photos = {
  Shirts: 'https://uniqlo.scene7.com/is/image/UNIQLO/goods_08_175597?$prod$',
  Pants: 'https://uniqlo.scene7.com/is/image/UNIQLO/goods_64_173699?$prod$',
  Shoes: 'https://uniqlo.scene7.com/is/image/UNIQLO/goods_18_184806?$prod$'
}

function createProduct() {
  const clothType = ['Shirts', 'Pants', 'Shoes'][Math.floor(Math.random() * 3)]
  const product = products[clothType][Math.floor(Math.random() * products[clothType].length)]
  const description = descriptions[Math.floor(Math.random() * descriptions.length)]
  const sex = ['Male', 'Female', 'Unisex'][Math.floor(Math.random() * 3)]
  return {
    name: sex.toUpperCase() + ' ' + product,
    description: product + ' ' + description,
    price: Math.floor(Math.random() * 50 + 10),
    inventory: 50,
    collections: [['Spring 17', 'Winter 16'][Math.round(Math.random())]],
    gender: sex,
    size: ['Small', 'Medium', 'Large'][Math.floor(Math.random() * 3)],
    type: clothType,
    photos: [photos[clothType]],
    available: [true, false][Math.round(Math.random())]
  }
}

function createProductList() {
  const productList = {}
  for (let i = 0; i < 20; i++) {
    productList[i] = createProduct()
  }

  return productList
}

const product = seed(Product, createProductList())

// const product = seed(Product,
//   // We're specifying a function here, rather than just a rows object.
//   // Using a function lets us receive the previously-seeded rows (the seed
//   // function does this wiring for us).
//   //
//   // This lets us reference previously-created rows in order to create the join
//   // rows. We can reference them by the names we used above (which is why we used
//   // Objects above, rather than just arrays).
//   ({users, things}) => ({
//     // The easiest way to seed associations seems to be to just create rows
//     // in the join table.
//     'obama loves surfing': {
//       user_id: users.barack.id,    // users.barack is an instance of the User model
//                                    // that we created in the user seed above.
//                                    // The seed function wires the promises so that it'll
//                                    // have been created already.
//       thing_id: things.surfing.id  // Same thing for things.
//     },
//     'god is into smiting': {
//       user_id: users.god.id,
//       thing_id: things.smiting.id
//     },
//     'obama loves puppies': {
//       user_id: users.barack.id,
//       thing_id: things.puppies.id
//     },
//     'god loves puppies': {
//       user_id: users.god.id,
//       thing_id: things.puppies.id
//     },
//   })
// )

if (module === require.main) {
  db.didSync
    .then(() => db.sync({force: true}))
    .then(seedEverything)
    .finally(() => process.exit(0))
}

class BadRow extends Error {
  constructor(key, row, error) {
    super(error)
    this.cause = error
    this.row = row
    this.key = key
  }

  toString() {
    return `[${this.key}] ${this.cause} while creating ${JSON.stringify(this.row, 0, 2)}`
  }
}

// seed(Model: Sequelize.Model, rows: Function|Object) ->
//   (others?: {...Function|Object}) -> Promise<Seeded>
//
// Takes a model and either an Object describing rows to insert,
// or a function that when called, returns rows to insert. returns
// a function that will seed the DB when called and resolve with
// a Promise of the object of all seeded rows.
//
// The function form can be used to initialize rows that reference
// other models.
function seed(Model, rows) {
  return (others={}) => {
    if (typeof rows === 'function') {
      rows = Promise.props(
        mapValues(others,
          other =>
            // Is other a function? If so, call it. Otherwise, leave it alone.
            typeof other === 'function' ? other() : other)
      ).then(rows)
    }

    return Promise.resolve(rows)
      .then(rows => Promise.props(
        Object.keys(rows)
          .map(key => {
            const row = rows[key]
            return {
              key,
              value: Promise.props(row)
                .then(row => Model.create(row)
                .then(newInstance => {
                  if (Model === User) {
                    return newInstance.addShippingAddresses([newInstance.id])
                    .then(() => newInstance.addShippingAddresses([newInstance.id]))
                  }
                })
                  .catch(error => { throw new BadRow(key, row, error) })
                )
            }
          }).reduce(
            (all, one) => Object.assign({}, all, {[one.key]: one.value}),
            {}
          )
        )
      )
      .then(seeded => {
        console.log(`Seeded ${Object.keys(seeded).length} ${Model.name} OK`)
        return seeded
      }).catch(error => {
        console.error(`Error seeding ${Model.name}: ${error} \n${error.stack}`)
      })
  }
}

module.exports = Object.assign(seed, {users, product, addresses})
