import API from 'api/Http'
import * as EndPoints from 'api/EndPoints'
import { message } from 'antd'

const CREATE_SHOP_REQUEST = 'Shop/CREATE_SHOP_REQUEST'
const CREATE_SHOP_SUCCESS = 'Shop/CREATE_SHOP_SUCCESS'
const CREATE_SHOP_FAILURE = 'Shop/CREATE_SHOP_FAILURE'

const UPDATE_SHOP_REQUEST = 'Shop/UPDATE_SHOP_REQUEST'
const UPDATE_SHOP_SUCCESS = 'Shop/UPDATE_SHOP_SUCCESS'
const UPDATE_SHOP_FAILURE = 'Shop/UPDATE_SHOP_FAILURE'

const DELETE_SHOP_REQUEST = 'Shop/DELETE_SHOP_REQUEST'
const DELETE_SHOP_SUCCESS = 'Shop/DELETE_SHOP_SUCCESS'
const DELETE_SHOP_FAILURE = 'Shop/DELETE_SHOP_FAILURE'

const FETCH_SHOP_LIST_REQUEST = 'Shop/FETCH_SHOP_LIST_REQUEST'
const FETCH_SHOP_LIST_SUCCESS = 'Shop/FETCH_SHOP_LIST_SUCCESS'
const FETCH_SHOP_LIST_FAILURE = 'Shop/FETCH_SHOP_LIST_FAILURE'

const FETCH_SHOP_BY_ID_REQUEST = 'Shop/FETCH_SHOP_BY_ID_REQUEST'
const FETCH_SHOP_BY_ID_SUCCESS = 'Shop/FETCH_SHOP_BY_ID_SUCCESS'
const FETCH_SHOP_BY_ID_FAILURE = 'Shop/FETCH_SHOP_BY_ID_FAILURE'

// Initialize State
const initialState = {
  isLoading: false,
  error: {},
  shopList: [],
  shopObj: {}
}

// Default Reducer
const shop = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_SHOP_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case CREATE_SHOP_SUCCESS:
      return {
        ...state,
        isLoading: false
      }
    case CREATE_SHOP_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    case UPDATE_SHOP_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case UPDATE_SHOP_SUCCESS:
      return {
        ...state,
        isLoading: false
      }
    case UPDATE_SHOP_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    case FETCH_SHOP_LIST_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case FETCH_SHOP_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        shopList: action.payload
      }
    case FETCH_SHOP_LIST_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    case FETCH_SHOP_BY_ID_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case FETCH_SHOP_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        shopObj: action.payload
      }
    case FETCH_SHOP_BY_ID_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    default:
      return state
  }
}

export default shop

// Action Creators
export const fetchShopList = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCH_SHOP_LIST_REQUEST
      })

      const response = await API.get(EndPoints.SHOP + `/`)

      if (response.status === 200) {
        dispatch({
          type: FETCH_SHOP_LIST_SUCCESS,
          payload: response.data
        })
      }
    } catch (err) {
      const errorMsg = err.response.data.message
      message.error(errorMsg)
      dispatch({
        type: FETCH_SHOP_LIST_FAILURE
      })
    }
  }
}

export const fetchShopById = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCH_SHOP_BY_ID_REQUEST
      })

      const response = await API.get(EndPoints.SHOP + `/${id}`)

      if (response.status === 200) {
        dispatch({
          type: FETCH_SHOP_BY_ID_SUCCESS,
          payload: response.data
        })
      }
    } catch (err) {
      dispatch({
        type: FETCH_SHOP_BY_ID_FAILURE
      })
    }
  }
}

export const createShop = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: CREATE_SHOP_REQUEST
      })

      const response = await API.post(EndPoints.SHOP + `/`, data)

      if (response.status === 200) {
        dispatch({
          type: CREATE_SHOP_SUCCESS
        })

        message.success('บันทึกข้อมูลสำเร็จ')
      }
    } catch (err) {
      dispatch({
        type: CREATE_SHOP_FAILURE
      })
    }
  }
}

export const updateShop = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_SHOP_REQUEST
      })

      const response = await API.put(EndPoints.SHOP + `/`, data)

      if (response.status === 200) {
        dispatch({
          type: UPDATE_SHOP_SUCCESS
        })

        message.success('บันทึกข้อมูลสำเร็จ')
      }
    } catch (err) {
      dispatch({
        type: UPDATE_SHOP_FAILURE
      })
    }
  }
}

export const deleteShop = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: DELETE_SHOP_REQUEST
      })

      const response = await API.delete(EndPoints.SHOP + `/${id}`)

      if (response.status === 200) {
        dispatch({
          type: DELETE_SHOP_SUCCESS
        })

        message.success('บันทึกข้อมูลสำเร็จ')
      }
    } catch (err) {
      dispatch({
        type: DELETE_SHOP_FAILURE
      })
    }
  }
}
