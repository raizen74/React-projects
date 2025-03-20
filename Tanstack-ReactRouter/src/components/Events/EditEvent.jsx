import {
  Link,
  redirect,
  useNavigate,
  useNavigation,
  useParams,
  useSubmit,
} from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import Modal from "../UI/Modal.jsx";
import EventForm from "./EventForm.jsx";
import { fetchEvent, updateEvent, queryClient } from "../../util/http.js";
// import LoadingIndicator from "../UI/LoadingIndicator.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";

export default function EditEvent() {
  const navigate = useNavigate();
  const { state } = useNavigation(); // returns an object with current navigation info
  const submit = useSubmit();
  const params = useParams();
  // data is already cached by the loader function, so useQuery will return the cached data
  const { data, isError, error } = useQuery({
    queryKey: ["event", params.id],
    queryFn: ({ signal }) => fetchEvent({ signal, id: params.id }),
    staleTime: 10000 // the cached data is used without refetching behind the scenes for 10 seconds
  });

  // const { mutate } = useMutation({
  //   // mutationKey: "updateEvent",
  //   mutationFn: updateEvent,
  //   onMutate: async (data) => {
  //     const newEvent = data.event;
  //     await queryClient.cancelQueries({ queryKey: ["event", params.id] }); // cancel ongoing queries
  //     // grab the current data from the cache to implement a rollback
  //     const previousEvent = queryClient.getQueryData(["events", params.id]); // get the current data from the cache
  //     // Optimistic Updating: update the cache with the new data
  //     // manipulate the stored data in the cache
  //     queryClient.setQueryData(["events", params.id], newEvent); // args: queryKey, new data
  //     return { previousEvent }; // return the result, which will be available on onError context
  //   }, // this function will be executed right when you call mutate (in handleSubmit), before we get back a response.
  //   // Implement a roll back if the request fails
  //   onError: (error, data, context) => {
  //     queryClient.setQueryData(["events", params.id], context.previousEvent); // rollback the data in the cache, context is the result from onMutate
  //   },
  //   // onSettled will be called after the mutation has been resolved or rejected
  //   onSettled: () => {
  //     queryClient.invalidateQueries(["events", params.id]); // invalidate the cache
  //   },
  // });

  function handleSubmit(formData) {
    // submit the form data, replaces mutate and navigate
    // this code triggers the action function
    submit(formData, { method: "PUT" });
    // mutate({ id: params.id, event: formData });
    // navigate("../"); // navigate to the page I am comming from
  }

  function handleClose() {
    navigate("../");
  }

  let content;

  // if (isPending) {
  //   content = (
  //     <div className='center'>
  //       <LoadingIndicator />
  //     </div>
  //   );
  // }

  if (isError) {
    content = (
      <>
        <ErrorBlock
          title='Failed to load event'
          message={
            error.info?.message ||
            "Failed to load event. Please check your inputs and try again later."
          }
        />
        <div className='form-actions'>
          <Link to='../' className='button'>
            Okay
          </Link>
        </div>
      </>
    );
  }

  if (data) {
    content = (
      <EventForm inputData={data} onSubmit={handleSubmit}>
        {state === "submitting" ? (
          <p>Submitting data...</p>
        ) : (
          <>
            <Link to='../' className='button-text'>
              Cancel
            </Link>
            <button type='submit' className='button'>
              Update
            </button>
          </>
        )}
      </EventForm>
    );
  }

  return <Modal onClose={handleClose}>{content}</Modal>;
}

// tell React Router to execute this function before the component is loaded
export function loader({ params }) {
  return queryClient.fetchQuery({
    queryKey: ["event", params.id],
    queryFn: ({ signal }) => fetchEvent({ signal, id: params.id }),
  }); // fetch the query programmatically
}

// triggered by React Router when a form in this page is submitted,
// only for non-GET requests
export async function action({ request, params }) {
  // args: request is the request object, params is the params from the URL
  const formData = await request.formData();
  const updatedEventData = Object.fromEntries(formData);
  await updateEvent({ id: params.id, event: updatedEventData });
  // all queries are affected by the fact that we are editing the event, so we invalidate all queries
  await queryClient.invalidateQueries(["events"]);
  return redirect("../");
}
