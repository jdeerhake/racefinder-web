import {
  FILTER_UPDATE_PARAM
} from './index'

export const updateParam = ( key, val ) => ({ type: FILTER_UPDATE_PARAM, key, val })
