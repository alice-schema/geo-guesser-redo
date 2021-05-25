import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';
import ScoreBoard from './Scoreboard';

const Results = ({API_KEY, isOpen, handleClose,
                  position, guess, distance,
                  scores, round, totalRounds}) => {
    
    const isLastRound = round+1 === totalRounds;

    const drawLine = (map, maps) => {
      //https://developers.google.com/maps/documentation/javascript/examples/polyline-simple#maps_polyline_simple-javascript
      const distanceLine = new maps.Polyline({
        path: [position, guess],
        geodesic: true,
        strokeColor: "dodgerblue",
        strokeOpacity: 1.0,
        strokeWeight: 4,
      });
      distanceLine.setMap(map);
    };

    const setBounds = (map, maps) => {
      // https://stackoverflow.com/questions/12350413/google-maps-auto-fit-auto-center-autozoom-doesnt-work
      const bounds = new maps.LatLngBounds();
      bounds.extend(position);
      bounds.extend(guess);
      map.fitBounds(bounds);
      map.panToBounds(bounds);
    };

    return (
    <Modal show={isOpen}>
      <Modal.Header>
        <Modal.Title>{`Round ${round+1}/${totalRounds}`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <ScoreBoard
            distance={distance}
            scores={scores}
            round={round}
            isLastRound={isLastRound}
          >
          </ScoreBoard>
          <div className="map_results">
            <GoogleMapReact
              bootstrapURLKeys={{ key: API_KEY }}
              defaultCenter={position}
              defaultZoom={-3}
              // https://www.npmjs.com/package/google-map-react#use-google-maps-api
              yesIWantToUseGoogleMapApiInternals
              onGoogleApiLoaded={({ map, maps }) => {
                setBounds(map, maps);
                drawLine(map, maps);
              }}
            >
              <Marker
                  lat={guess.lat}
                  lng={guess.lng}
                  isGuess={true}
              ></Marker>
              <Marker
                  lat={position.lat}
                  lng={position.lng}
                  isGuess={false}
              ></Marker>
            </GoogleMapReact>
          </div>
      </Modal.Body>
      <Modal.Footer>
        <Button className="btn btn-primary" onClick={handleClose}>
          {isLastRound ? "New Game!" : "Next Round"}
        </Button>
      </Modal.Footer>
    </Modal>)
}

export default Results;