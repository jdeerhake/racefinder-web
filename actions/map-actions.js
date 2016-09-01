import {
  MAP_CHANGE_BOUNDS,
  MAP_CHANGE_CENTER,
  MAP_CHANGE_ZOOM,
  MAP_CLICK,
  MAP_CREATED
} from './index'

export const changeBounds = bounds => ({ type: MAP_CHANGE_BOUNDS, bounds })

export const changeCenter = center => ({ type: MAP_CHANGE_CENTER, center })

export const changeZoom = zoom => ({ type: MAP_CHANGE_ZOOM, zoom })

export const click = () => ({ type: MAP_CLICK })

export const createMap = gMap => ({ type: MAP_CREATED, gMap })
