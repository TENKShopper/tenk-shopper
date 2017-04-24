import React, {Component} from 'react';
import {connect} from 'react-redux'


//need checkbox for ....
// gender (male / female)
// clothing type
//size
//???




export const FilterInput = (props) => {

  const handleChange = props.handleChange;
  const inputValue = props.inputValue;

  return (
    <form className='form-group' style={{marginTop: '20px'}}>
      <input
        onChange={handleChange}
        value={inputValue}
        className='form-control'
        placeholder="Find clothing"
      />
    </form>
  )
};

  const mapStateToProps = (state) =>{
    const products = products.list

    return {
      products: products.list
    }
}

class FilterableProducts extends Component{
  constructor(props){
    super()
    this.state = {inputValue: ''}
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(evt){
    const inputValue = evt.target.value;
    this.setState({inputValue})
  }

  render(){
    const inputValue = this.state.inputValue;
    const filteredProducts = this.props.products.filter(product => product.title.match(inputValue))

    return (
      <div>
        <FilterInput handleChange={this.handleChange} inputValue={inputValue} />
        <Products products={filteredProducts}/>
      </div>
    );
  }

}

export default connect(
  mapStateToProps
)(FilterableProducts)