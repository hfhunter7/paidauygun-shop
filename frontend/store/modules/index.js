import { combineReducers } from 'redux'
import product from 'store/modules/product';
import productCategory from 'store/modules/productCategory';
import shop from 'store/modules/shop';

export default combineReducers({
  shop,
  product,
  productCategory
})
