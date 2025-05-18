import { useLoadScript, GoogleMap, Marker } from '@react-google-maps/api'
import './map.style.css'
import type { IMapProps } from './map.interface'
import type { FC } from 'react'

const Map: FC<IMapProps> = ({ lat, lng }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  })

  if (loadError) {
    return <div className="map-error">Não foi possível carregar o mapa.</div>
  }

  if (!isLoaded) {
    return <div className="map-skeleton" />
  }

  return (
    <GoogleMap mapContainerClassName="map-container" center={{ lat, lng }} zoom={15} options={{ streetViewControl: false, mapTypeControl: false }}>
      <Marker position={{ lat, lng }} />
    </GoogleMap>
  )
}

export default Map