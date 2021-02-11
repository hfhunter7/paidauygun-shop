import API from 'api/Http'
import * as EndPoints from 'api/EndPoints'
import { message } from 'antd'

const FETCH_PRODUCT_CATEGORY_LIST_REQUEST =
  'ProductCategory/FETCH_PRODUCT_CATEGORY_LIST_REQUEST'
const FETCH_PRODUCT_CATEGORY_LIST_SUCCESS =
  'ProductCategory/FETCH_PRODUCT_CATEGORY_LIST_SUCCESS'
const FETCH_PRODUCT_CATEGORY_LIST_FAILURE =
  'ProductCategory/FETCH_PRODUCT_CATEGORY_LIST_FAILURE'

// Initialize State
const initialState = {
  isLoading: false,
  error: {},
  productCategoryList: []
}

// Default Reducer
const productCategory = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCT_CATEGORY_LIST_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case FETCH_PRODUCT_CATEGORY_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        productCategoryList: action.payload
      }
    case FETCH_PRODUCT_CATEGORY_LIST_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    default:
      return state
  }
}

export default productCategory

// Action Creators
export const fetchProductCategoryList = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCH_PRODUCT_CATEGORY_LIST_REQUEST
      })

      const response = await API.get(EndPoints.PRODUCT_CATEGORY + `/`)

      if (response.status === 200) {
        dispatch({
          type: FETCH_PRODUCT_CATEGORY_LIST_SUCCESS,
          payload: response.data
        })
      }
    } catch (err) {
      const errorMsg = err.response.data.message
      message.error(errorMsg)
      dispatch({
        type: FETCH_PRODUCT_CATEGORY_LIST_FAILURE
      })
    }
  }
}
