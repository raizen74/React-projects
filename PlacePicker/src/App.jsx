import { useRef, useState, useCallback } from 'react';

import Places from './components/Places.jsx';
import { AVAILABLE_PLACES } from './data.js';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import { sortPlacesByDistance } from './loc.js'

// grap stored ids from Local storage
const storedIds = JSON.parse(localStorage.getItem('selectedPlaces')) || []; // if undefined set an empty array 
const storedPlaces = storedIds.map((id) => AVAILABLE_PLACES.find((place) => place.id === id))

function App() {
  const selectedPlace = useRef();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState(AVAILABLE_PLACES);
  const [pickedPlaces, setPickedPlaces] = useState(storedPlaces);

  // console.log(AVAILABLE_PLACES)
  // useEffect(() => {
  //   // navigator object provided by the browser
  //   // this code is a side effect
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     const sortPlaces = sortPlacesByDistance(
  //       AVAILABLE_PLACES,
  //       position.coords.latitude,
  //       position.coords.longitude,
  //     ); // function called once the location has been determined
  //     setAvailablePlaces(sortPlaces);
  //   });
  // }, []); // useEffect executes the function after the App component execution finishes

  function handleStartRemovePlace(id) {
    setModalIsOpen(true);
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  function handleSelectPlace(id) {
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }
      const place = AVAILABLE_PLACES.find((place) => place.id === id);
      return [place, ...prevPickedPlaces];
    });
    // side effect code since it does not affect rendering
    const storedIds = JSON.parse(localStorage.getItem('selectedPlaces')) || []; // if undefined set an empty array 
    if (storedIds.indexOf(id) === -1) { // if id it is not in the array
      localStorage.setItem('selectedPlaces', JSON.stringify([id, ...storedIds]));// second parameter must be str format
    }
  }

  const handleRemovePlace = useCallback(function handleRemovePlace() {
    setPickedPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
    );
    setModalIsOpen(false);
    // grap selected places
    const storedIds = JSON.parse(localStorage.getItem('selectedPlaces')) || []; // if undefined set an empty array 
    // mask the original array with .filter, every element True except current
    localStorage.setItem('selectedPlaces', JSON.stringify(storedIds.filter((id) => id !== selectedPlace.current)))
  })

  return (
    <>
      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText={'Select the places you would like to visit below.'}
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          title="Available Places"
          places={availablePlaces}
          fallbackText="Sorting places by distance..."
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}

export default App;
