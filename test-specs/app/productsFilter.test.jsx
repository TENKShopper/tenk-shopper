import React from 'react'
import chai, {expect} from 'chai'
chai.use(require('chai-enzyme')())
import {shallow} from 'enzyme'
import {spy} from 'sinon'
chai.use(require('sinon-chai'))
import {ProductsFilter} from '../../app/components/productsFilter'

describe('productsFilter helper functs', function() {

  const product = {
    name: 'Blue Suede Shoes',
    categories: ['shoes', 'blue'],
    available: true,
    id: 1,
    photos: ['http://placehold.it/150x150']
  }

  let testComponent
  beforeEach('Create a shallow component', () => {
    testComponent = shallow(<ProductsFilter/>)
    testComponent.setState({nameQuery: 'Blue Suede Shoes', categoryQuery: ['shoes', 'blues']})
    console.log(testComponent, 'TESTCOMPONENT');
  })

  it(' filterProducts should return true on an accurate match', function(){
    expect(testComponent.filterProducts(product)).to.equal(true)
  })






})
