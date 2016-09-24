import React from 'react'
import ReactDOM from 'react-dom'
import MapGL from 'react-map-gl'

// later in your app...
ReactDOM.render(
  <MapGL
    width={ 700 }
    height={ 450 }
    latitude={ 37.78 }
    longitude={ -122.45 }
    zoom={ 11 }
    mapStyle={ 'mapbox://styles/mapbox/streets-v9' }
    mapboxApiAccessToken={ 'pk.eyJ1IjoicmFjZWZpbmRlciIsImEiOiJjaXRlbXc0YXkwNjJnMnRteWtyMTNudmkyIn0.QUlU2tftXnaVGENvXtSYwQ' }
   />,
   document.querySelector( '#map' )
)
