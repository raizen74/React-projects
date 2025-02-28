export async function fetchAvailablePlaces() {
  const response = await fetch("http://172.30.210.50:3000/places"); // send a GET request, returns a PROMISE (object that wraps a Response that will eventually be there)
  const resData = await response.json(); // .json() returns another PROMISE

  if (!response.ok) {
    // check if response has a 400 or 500 Status Code
    throw new Error("Failed to fetch places");
  }

  return resData.places;
}
export async function fetchUserPlaces() {
  const response = await fetch("http://172.30.210.50:3000/user-places"); // send a GET request, returns a PROMISE (object that wraps a Response that will eventually be there)
  const resData = await response.json(); // .json() returns another PROMISE

  if (!response.ok) {
    // check if response has a 400 or 500 Status Code
    throw new Error("Failed to fetch user places");
  }

  return resData.places;
}

export async function updateUserPlaces(places) {
  const response = await fetch("http://172.30.210.50:3000/user-places", {
    method: "PUT",
    body: JSON.stringify({places: places}), // the backend expects this format
    headers: {
      "Content-Type": "application/json",
    },
  });
  const resData = await response.json();

  if (!response.ok) {
    // check if response has a 400 or 500 Status Code
    throw new Error("Failed to update user data.");
  }

  return resData.message;
}
