import { useRef, useState, useCallback, useEffect } from "react";

import Places from "./components/Places.jsx";
import Modal from "./components/Modal.jsx";
import DeleteConfirmation from "./components/DeleteConfirmation.jsx";
import logoImg from "./assets/logo.png";
import AvailablePlaces from "./components/AvailablePlaces.jsx";
import { fetchUserPlaces, updateUserPlaces } from "./http.js";
import ErrorPage from "./components/Error.jsx";

function App() {
  const selectedPlace = useRef();

  const [userPlaces, setUserPlaces] = useState([]);
  const [isFetching, setIsFetching] = useState(false); // manage data fetching state
  const [error, setError] = useState(); // error state to show potential errors on screen


  const [errorUpdatingPlaces, setErrorUpdatingPlaces] = useState();

  const [modalIsOpen, setModalIsOpen] = useState(false);

useEffect(() => {
  async function fetchPlaces() {
    setIsFetching(true);
    try {
      const places = await fetchUserPlaces();
      setUserPlaces(places);
    } catch (error) {
      setError({message: error.message || "failed to fetch user places."})
    }
    setIsFetching(false);
  }
  fetchPlaces();
}, [])

  function handleStartRemovePlace(place) {
    setModalIsOpen(true);
    selectedPlace.current = place;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  async function handleSelectPlace(selectedPlace) {
    // await updateUserPlaces([selectedPlace,...userPlaces]) // await the response BEFORE updating state

    setUserPlaces((prevPickedPlaces) => {
      if (!prevPickedPlaces) {
        prevPickedPlaces = [];
      }
      if (prevPickedPlaces.some((place) => place.id === selectedPlace.id)) {
        return prevPickedPlaces;
      }
      return [selectedPlace, ...prevPickedPlaces];
    });
    // send a request to the backend AFTER updating state (optimistic updating)
    try {
      await updateUserPlaces([selectedPlace, ...userPlaces]); // await async call
    } catch (error) {
      setUserPlaces(userPlaces); // if the update fails, return to initial state
      setErrorUpdatingPlaces({
        message: error.message || "Failed to update places.",
      });
    }
  }

  const handleRemovePlace = useCallback(async function handleRemovePlace() {
    setUserPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current.id)
    );
try {
  await updateUserPlaces(
    userPlaces.filter((place) => place.id !== selectedPlace.current.id)
  );

} catch(error) {
setUserPlaces(userPlaces); // rollback the change
setErrorUpdatingPlaces({
  message: error.message || "Failed to delete place.",
});
}

    setModalIsOpen(false);
  }, [userPlaces]);  // dependecy userPlaces -> triggers useCallback

  function handleError() {
    setErrorUpdatingPlaces(null);
  }
  return (
    <>
      <Modal open={errorUpdatingPlaces} onClose={handleError}>
        {errorUpdatingPlaces && (
          <ErrorPage
            title='An error ocurred'
            message={errorUpdatingPlaces.message}
            onConfirm={handleError}
          ></ErrorPage>
        )}
      </Modal>
      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt='Stylized globe' />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        {error && <ErrorPage title="An error ocurred!" message={error.message}></ErrorPage>}
        {!error && <Places
          title="I'd like to visit ..."
          fallbackText='Select the places you would like to visit below.'
          isLoading={isFetching}
          loadingText="Fetching your places..."
          places={userPlaces}
          onSelectPlace={handleStartRemovePlace}
        />}

        <AvailablePlaces onSelectPlace={handleSelectPlace} />
      </main>
    </>
  );
}

export default App;
