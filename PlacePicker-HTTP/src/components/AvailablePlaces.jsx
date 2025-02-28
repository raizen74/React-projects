import { useState, useEffect } from "react";

import Places from "./Places.jsx";
import ErrorPage from "./Error.jsx";
// import { sortPlacesByDistance } from "../loc.js";
import { fetchAvailablePlaces } from "../http.js";

// const places = localStorage.getItem('places'); // sync call

export default function AvailablePlaces({ onSelectPlace }) {
  //  Component functions cannot be prefixed with async
  const [isFetching, setIsFetching] = useState(false); // manage data fetching state
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState(); // error state to show potential errors on screen

  useEffect(() => {
    async function fetchPlaces() {
      // to use await inside a function, it must be prefixed with async.
      setIsFetching(true);

      try {
        const places = await fetchAvailablePlaces();

        setAvailablePlaces(places); // this state update would trigger component reexecution (infinite loop) -> useEffect to avoid it
        // GEOPOSITION DOES NOT WORK
        // the parameter is a function that executes when the position is fetched
        // navigator.geolocation.getCurrentPosition((position) => {
        //   const sortedPlaces = sortPlacesByDistance(
        //     places,
        //     position.coords.latitude,
        //     position.coords.longitude
        //   );
        //   setAvailablePlaces(sortedPlaces); // this state update would trigger component reexecution (infinite loop) -> useEffect to avoid it
        //   setIsFetching(false);  // when we are done with fetching location and transform the data we flag state to false
        // });
      } catch (error) {
        setError({
          message:
            error.message || "Could not fetch places, please try again later",
        }); // receives the Error object
      }
      setIsFetching(false); // always update fetch state -> If we got an error or not
    }
    fetchPlaces();
    // OPTION 2

    // fetch("http://172.30.210.50:3000/places")
    //   .then(
    //     (response) => response.json()
    //   )
    //   .then((resData) => {
    //     setAvailablePlaces(resData.places);
    //   });
  }, []); // No dependencies, never reexecutes

  if (error) {
    return <ErrorPage title={"An error ocurred"} message={error.message} />;
  }
  return (
    <Places
      title='Available Places'
      places={availablePlaces}
      isLoading={isFetching}
      loadingText='Fetching places data...'
      fallbackText='No places available.'
      onSelectPlace={onSelectPlace}
    />
  );
}
