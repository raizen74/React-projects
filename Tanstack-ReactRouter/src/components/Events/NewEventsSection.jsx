// import { useEffect, useState } from 'react';
import { useQuery } from "@tanstack/react-query";

import LoadingIndicator from "../UI/LoadingIndicator.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import EventItem from "./EventItem.jsx";
import { fetchEvents } from "../../util/http.js";

export default function NewEventsSection() {
  // object destructuring -> pull data from object returned by useQuery
  // React Query caches the data fetched and will display it immediately in subsequent calls,
  // and in the background will send another request to fetch the latest data
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["events", {max: 3}], //key used to cache data from the response
    // 
    queryFn: ({signal, queryKey}) => fetchEvents({signal, ...queryKey[1]}), ////useQuery wants a function that returns a Promise -> fetch the data
    staleTime: 5000, // how much time the cache is valid 
    gcTime: 1000 // how much time the data in the cache is kept (immediately available while sending the request in the background)
  });

  let content;

  if (isPending) {
    content = <LoadingIndicator />;
  }

  if (isError) {
    content = (
      <ErrorBlock
        title='An error occurred'
        // if the object contains the info property, show its message
        message={error.info?.message || "Failed to fetch events"}
      />
    );
  }

  if (data) {
    content = (
      <ul className='events-list'>
        {data.map((event) => (
          <li key={event.id}>
            <EventItem event={event} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className='content-section' id='new-events-section'>
      <header>
        <h2>Recently added events</h2>
      </header>
      {content}
    </section>
  );
}
