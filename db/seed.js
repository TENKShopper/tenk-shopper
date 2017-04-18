'use strict'

const db = require('APP/db')
    , {User, Addresses, Product, Promise} = db
    , {mapValues} = require('lodash')

function seedEverything() {
  const seeded = {
    users: users(),
    product: product(),
  }

  // seeded.favorites = favorites(seeded)

  return Promise.props(seeded)
}

const names = ['Tina', 'Emily', 'Nate', 'Kido', 'Omri', 'Ian', 'John']
function createUser() {
  const name = names.shift()
  const user = name + `${Math.floor(Math.random() * 100)}`
  return {
    userName: user,
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

const products = {
  shirt: ['HIGH NECK HALF SLEEVE T-SHIRT', 'DRY YOGA SHORT-SLEEVE T-SHIRT', 'EXTRA FINE MERINO V-NECK CARDIGAN', 'PEANUTS SHORT-SLEEVE GRAPHIC TEE', 'EASY CARE OXFORD LONG SLEEVE SHIRT'],
  pants: ['RELAXED ANKLE PANTS', 'SKINNY STRAIGHT JEANS', 'AIRISM PILE LINED LOUNGE SHORTS'],
  shoes: ['DISNEY MAROON SLIPPERS', 'NIKE AIR MAX 90 ULTRA 2.0 BREATHE']
}
const descriptions = ['is fabulous!', 'great for any occasion.', 'is binary', 'classy and elegant.', 'features a soft, fluffy feel!', 'gently snug relaxed fit ideal for relaxing at home.']
const gender = ['MEN', 'WOMEN']
const clothingType = ['shirt', 'pants', 'shoes']
const photos = ['http://demandware.edgesuite.net/aawj_prd/on/demandware.static/-/Library-Sites-CTShirtsSharedLibrary/default/dw9877fa95/images/plp-tooltip_fit-shirt-extraslim.jpg', 'https://lh4.ggpht.com/o43b2VB6Dl-g75RD7D0Q2Mhb7aFzSKjGkq3TOPuKyJapxY6l6OhLd0jqYfE1Nsa5Z12y%3Dw300', 'https://thumbs.dreamstime.com/x/old-shoe-boot-cartoon-clip-art-illustration-36390217.jpg']

function createProduct() {
  const clothType = clothingType[Math.floor(Math.random() * clothingType.length)]
  const product = products[clothType][Math.floor(Math.random() * products[clothType].length)]
  const description = descriptions[Math.floor(Math.random() * descriptions.length)]
  const sex = gender[Math.floor(Math.random() * 2)]
  const pic = photos[Math.floor(Math.random() * 3)]
  return {
    title: sex + ' ' + product,
    description: product + ' ' + description,
    price: Math.floor(Math.random() * 50 + 10),
    gender: sex,
    clothingType: clothType,
    photo: pic
  }
}

function createProductList() {
  const productList = {}
  for (let i = 0; i < 10; i++) {
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

module.exports = Object.assign(seed, {users, product})
