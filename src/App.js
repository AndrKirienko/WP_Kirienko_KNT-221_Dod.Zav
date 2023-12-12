import React from 'react';
import a from'./App.css';
import Image from './modules/Image';
import { Map }  from './modules/Map';
import { useJsApiLoader } from '@react-google-maps/api'

const libraries = ['places']
const defaultCenter = {
  lat: 49.849475861439025, 
  lng: 24.03567446058366
};

const App = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyCiwGXiUlxi5keReElXLNv9c8qwvielRRI',
    libraries
  })

  return (
    <div className={a.container}>
      <Image />
      {isLoaded ? <Map center={defaultCenter} /> : <h2>Loading</h2>}
    </div>

  );
}

export default App;


