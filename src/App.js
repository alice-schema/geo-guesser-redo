import './App.css';
import { useState, useEffect } from 'react';
import StreetView from './components/StreetView'
import OverlayMap from './components/OverlayMap';
import Results from './components/Results';
import { getRandomSet, calculateScore } from './utils/helpers';
import { getDistance } from './utils/geoDistance';
import { locations } from './data/locations';

const App = () => {

  const API_KEY = process.env.REACT_APP_MAPS_API_KEY;
  const totalRounds = 3;

  const [positionInventory, setPositionInventory] = useState([]);
  const [round, setRound] = useState(0);
  const [position, setPosition] = useState();
  const [guessPosition, setGuessPosition] = useState();
  const [distance, setDistance] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scores, setScores] = useState([]);


  // ------------ EFFECTS ------------
  // populating inventory of coordinates for the current game
  // - only at the beginning of the game
  useEffect(() => {
    setPositionInventory(getRandomSet(locations, totalRounds));
  }, [])

  // grab the coordinates from the inventory for the current round
  // - if new round or new game begins
  useEffect(() => {
    if (positionInventory) setPosition(positionInventory[round])
  }, [round, positionInventory])

  // calculate score
  // - every time guess updates
  useEffect(() => {
    if (guessPosition) {
      const roundDistance = getDistance(position, guessPosition);
      setDistance(roundDistance);
      setScores([...scores, calculateScore(roundDistance)]);
    }
  }, [guessPosition])
  // ------------ END EFFECTS ------------


  const handleClose = () => {
    setPosition(null);
    setIsModalOpen(false);

    if (round + 1 < totalRounds) {
      setRound(round + 1);
    } else {
      // new game
      setPositionInventory(getRandomSet(locations, totalRounds));
      setRound(0);
      setScores([]);
    }
  }

  const submitGuess = (markerPosition) => {
    setGuessPosition(markerPosition);
    setIsModalOpen(true);
  }

  return (
    <div className="App">
        {isModalOpen && <Results
          API_KEY={API_KEY}
          isOpen={isModalOpen}
          handleClose={handleClose}
          position={position}
          guess={guessPosition}
          round={round}
          totalRounds={totalRounds}
          scores={scores}
          distance={distance}
        ></Results>}
        <OverlayMap
          API_KEY={API_KEY} 
          submitGuess={submitGuess}>
        </OverlayMap>
        {position && <StreetView 
          API_KEY={API_KEY}
          position={position}
        >
        </StreetView>}
    </div>
  );
}

export default App;
