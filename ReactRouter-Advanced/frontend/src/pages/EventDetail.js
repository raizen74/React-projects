import {
  useParams,
  useLoaderData,
  useRouteError,
  useRouteLoaderData,
  redirect,
  Await,
} from "react-router-dom";
import EventItem from "../components/EventItem";
import { Suspense } from "react";
import EventsList from "../components/EventsList";

export default function EventDetailPage() {
  // const params = useParams(); // gives access to the current route param eventId, defined in App.js
  const { event, events } = useRouteLoaderData("event.detail"); // takes the loader from a specific route
  // const error = useRouteError();
  return (
    <>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={event}>
          {(loadedEvent) => <EventItem event={loadedEvent} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>
      {/* <EventItem event={data.event} />
      <EventList events={}/> */}
    </>
  );
}

async function loadEvent(id) {
  const response = await fetch("http://172.30.210.50:8080/events/" + id);

  if (!response.ok) {
    throw new Response(
      JSON.stringify({
        message: "Could not fetch details for selected event!",
      }),
      {
        status: 500,
      }
    );
    // throw json({message: "Could not fetch details for this event!"}, { status: 500})
  }

  const resData = await response.json();
  return resData.event;
}

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
    console.log(resData);
    return resData.events;
  }
}

// React Router automatically passes request and params as args to loader
export async function loader({ request, params }) {
  const id = params.eventId; // access to route params
  return {
    event: await loadEvent(id), // await this data before rendering the page
    events: loadEvents()  // render the page without waiting the data
  };
}

export async function action({ params, request }) {
  const eventId = params.eventId;

  const response = await fetch("http://172.30.210.50:8080/events/" + eventId, {
    method: request.method, // access request data -> EventItem.js ln 11
  });
  if (!response.ok) {
    throw new Response(JSON.stringify({ message: "Could not delete event!" }), {
      status: 500,
    });
    // throw json({message: "Could not fetch details for this event!"}, { status: 500})
  }
  return redirect("/events");
}
