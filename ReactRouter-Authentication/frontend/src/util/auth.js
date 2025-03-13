// function for extracting the token

import { redirect } from "react-router-dom";

export function getTokenDuration() {
  const storedExpirationDate = localStorage.getItem('expiration');
  const expirationDate = new Date(storedExpirationDate);
  const now = new Date();
  const duration = expirationDate.getTime() -now.getTime();
  return duration;
}

export default function getAuthToken() {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  const tokenDuration = getTokenDuration();

  if (tokenDuration < 0) {
    return 'EXPIRED';
  }
  
  return token;
}

export function tokenLoader() {
  return getAuthToken();
}

// loader to protect a route in App.js
export function checkAuthLoader() {
  const token = getAuthToken();

  if (!token) {
    return redirect('/auth')
  }

  return null;
}
