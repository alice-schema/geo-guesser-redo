// https://www.npmjs.com/package/google-map-react

import GoogleMapReact from 'google-map-react';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import Marker from './Marker';

const OverlayMap = ({ API_KEY, submitGuess }) => {

    const defaultCenter = {lat: 46.91, lng: 17.89}; // Europe

    const [marker, setMarker] = useState(null);
    
    const handleMapClick = ({x, y, lat, lng, event}) => {
      setMarker({lat, lng});
    };

    const handleSubmit = () => {
      if (marker) {
        submitGuess(marker);
        setMarker(null);
      }
    };

    return (
      // Important! Always set the container height explicitly
      <div className="map_overlay">

        <GoogleMapReact
          bootstrapURLKeys={{ key: API_KEY }}
          defaultCenter={defaultCenter}
          defaultZoom={1}
          onClick={handleMapClick}
        >
        {marker &&
          <Marker
              lat={marker.lat}
              lng={marker.lng}
              isGuess={true}
          ></Marker>
        }
        </GoogleMapReact>
        
        <Button
            onClick={handleSubmit}
            variant="primary"
            block
        >Guess
        </Button>

      </div>
    )
}

export default OverlayMap;