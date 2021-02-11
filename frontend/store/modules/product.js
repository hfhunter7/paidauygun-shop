import API from 'api/Http'
import * as EndPoints from 'api/EndPoints'
import { message } from 'antd'

const CREATE_PRODUCT_REQUEST = 'Product/CREATE_PRODUCT_REQUEST'
const CREATE_PRODUCT_SUCCESS = 'Product/CREATE_PRODUCT_SUCCESS'
const CREATE_PRODUCT_FAILURE = 'Product/CREATE_PRODUCT_FAILURE'

const UPDATE_PRODUCT_REQUEST = 'Product/UPDATE_PRODUCT_REQUEST'
const UPDATE_PRODUCT_SUCCESS = 'Product/UPDATE_PRODUCT_SUCCESS'
const UPDATE_PRODUCT_FAILURE = 'Product/UPDATE_PRODUCT_FAILURE'

const DELETE_PRODUCT_REQUEST = 'Product/DELETE_PRODUCT_REQUEST'
const DELETE_PRODUCT_SUCCESS = 'Product/DELETE_PRODUCT_SUCCESS'
const DELETE_PRODUCT_FAILURE = 'Product/DELETE_PRODUCT_FAILURE'

const FETCH_PRODUCT_LIST_REQUEST = 'Product/FETCH_PRODUCT_LIST_REQUEST'
const FETCH_PRODUCT_LIST_SUCCESS = 'Product/FETCH_PRODUCT_LIST_SUCCESS'
const FETCH_PRODUCT_LIST_FAILURE = 'Product/FETCH_PRODUCT_LIST_FAILURE'

const FETCH_PRODUCT_BY_ID_REQUEST = 'Product/FETCH_PRODUCT_BY_ID_REQUEST'
const FETCH_PRODUCT_BY_ID_SUCCESS = 'Product/FETCH_PRODUCT_BY_ID_SUCCESS'
const FETCH_PRODUCT_BY_ID_FAILURE = 'Product/FETCH_PRODUCT_BY_ID_FAILURE'

// Initialize State
const initialState = {
  isLoading: false,
  error: {},
  productList: [],
  productObj: {}
}

// Default Reducer
const product = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PRODUCT_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false
      }
    case CREATE_PRODUCT_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    case UPDATE_PRODUCT_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false
      }
    case UPDATE_PRODUCT_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    case FETCH_PRODUCT_LIST_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case FETCH_PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        productList: action.payload
      }
    case FETCH_PRODUCT_LIST_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    case FETCH_PRODUCT_BY_ID_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case FETCH_PRODUCT_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        productObj: action.payload
      }
    case FETCH_PRODUCT_BY_ID_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    default:
      return state
  }
}

export default product

// Action Creators
export const fetchProductList = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCH_PRODUCT_LIST_REQUEST
      })

      const response = await API.get(EndPoints.PRODUCT + `/`)

      if (response.status === 200) {
        dispatch({
          type: FETCH_PRODUCT_LIST_SUCCESS,
          payload: response.data
        })
      }
    } catch (err) {
      dispatch({
        type: FETCH_PRODUCT_LIST_FAILURE
      })
    }
  }
}

export const fetchProductById = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCH_PRODUCT_BY_ID_REQUEST
      })

      const response = await API.get(EndPoints.PRODUCT + `/${id}`)

      if (response.status === 200) {
        dispatch({
          type: FETCH_PRODUCT_BY_ID_SUCCESS,
          payload: response.data
        })
      }
    } catch (err) {
      dispatch({
        type: FETCH_PRODUCT_BY_ID_FAILURE
      })
    }
  }
}

export const createProduct = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: CREATE_PRODUCT_REQUEST
      })

      const response = await API.post(EndPoints.PRODUCT + `/`, data)

      if (response.status === 200) {
        dispatch({
          type: CREATE_PRODUCT_SUCCESS
        })

        message.success('บันทึกข้อมูลสำเร็จ')
      }
    } catch (err) {
      dispatch({
        type: CREATE_PRODUCT_FAILURE
      })
    }
  }
}

export const updateProduct = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_PRODUCT_REQUEST
      })

      const response = await API.put(EndPoints.PRODUCT + `/`, data)

      if (response.status === 200) {
        dispatch({
          type: UPDATE_PRODUCT_SUCCESS
        })

        message.success('บันทึกข้อมูลสำเร็จ')
      }
    } catch (err) {
      dispatch({
        type: UPDATE_PRODUCT_FAILURE
      })
    }
  }
}

export const deleteProduct = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: DELETE_PRODUCT_REQUEST
      })

      const response = await API.delete(EndPoints.PRODUCT + `/${id}`)

      if (response.status === 200) {
        dispatch({
          type: DELETE_PRODUCT_SUCCESS
        })

        message.success('บันทึกข้อมูลสำเร็จ')
      }
    } catch (err) {
      dispatch({
        type: DELETE_PRODUCT_FAILURE
      })
    }
  }
}
