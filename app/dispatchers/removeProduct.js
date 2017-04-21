import axios from 'axios'

export default (id) => dispatch => {
 dispatch(remove(id));
 axios.delete(`/api/product/${id}`)
      .catch(err => console.error(`Removing product: ${id} unsuccesful`, err));
};
