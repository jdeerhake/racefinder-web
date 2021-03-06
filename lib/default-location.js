import PromisedLocation from 'promised-location'
import { showBySlug as getMarket } from '../adapters/market'

const DEFAULT_ZOOM = 9

const normalizeQuery = q => ({
  lat: parseFloat( q.lat ),
  lng: parseFloat( q.lng ),
  zoom: parseFloat( q.zoom ),
  marketSlug: q.marketSlug
})

const methods = [

  function slug({ marketSlug }) {
    const market = getMarket( marketSlug )
    if( market ) {
      return Promise.resolve({
        latitude: market.location.lat,
        longitude: market.location.lng,
        zoom: DEFAULT_ZOOM
      })
    } else {
      return Promise.reject()
    }
  },

  function query({ lat, lng, zoom }) {
    if( zoom && lat && lng ) {
      return Promise.resolve({
        latitude: lat,
        longitude: lng,
        zoom
      })
    } else {
      return Promise.reject()
    }
  },

  function geolocation() {
    const getLoc = new PromisedLocation({
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 60000
    })

    return getLoc.then(({ coords: { latitude, longitude }}) => ({
      latitude,
      longitude,
      zoom: DEFAULT_ZOOM
    }))
  },

  function fallback() {
    return Promise.resolve({
      latitude: 34.03,
      longitude: -118.5,
      zoom: DEFAULT_ZOOM
    })
  }
]

export default function getLocation( query ) {
  const iterator = methods[ Symbol.iterator ]()
  const normalQuery = normalizeQuery( query )

  function iterate() {
    return iterator.next().value( normalQuery ).catch( iterate )
  }

  return iterate()
}
