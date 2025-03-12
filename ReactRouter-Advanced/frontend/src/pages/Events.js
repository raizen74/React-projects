import { useLoaderData, Await } from "react-router-dom"; // access closer loader data

import EventsList from "../components/EventsList";
import { Suspense } from "react";

function EventsPage() {
  // useLoaderData receives the data yielded from the loader Promise in App.js, available in all sibling routes
  const data = useLoaderData();
  console.log(data);

  const events = data.events;
  // load a fallback text while fetching data
  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );
}

export default EventsPage;

async function loadEvents() {
  const response = await fetch("http://172.30.210.50:8080/events");

  if (!response.ok) {
    // return {isError: true, message: "Could not fetch event!"};
    // throw responses instead of regular objects
    throw new Response(JSON.stringify({ message: "Could not fetch events!" }), {
      status: 500,
    });
    // throw json({ message: "Could not fetch events!" }, { status: 500 }); // React Router implementation
  } else {
    // return the response (Promise) without awaiting response.json()
    // React Router automatically handles the awating
    const resData = await response.json();
    return resData.events;
  }
}

export async function loader() {
  return { events: loadEvents() };
}
