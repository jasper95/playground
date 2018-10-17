import React from 'react'
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoiamFzcGVyMDcxMTk1IiwiYSI6ImNqbWdodXRybDFpZXoza252OGN5ejl4czAifQ.iu8PWmWL5EWUe38U3LYsgA"
});

const MapWithAMarker = () => (
  <Map
    style='mapbox://styles/mapbox/streets-v9' // eslint-disable-line
    containerStyle={{
      height: "100vh",
      width: "100vw"
    }}
  >
    <Layer
      type="symbol"
      id="marker"
      layout={{ "icon-image": "marker-15" }}>
      <Feature coordinates={[-0.481747846041145, 51.3233379650232]}/>
    </Layer>
  </Map>
)

export default MapWithAMarker