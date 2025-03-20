import { Link, useNavigate } from "react-router-dom";
// with useMutation, the request is only sent when you want to send it
import { useMutation } from "@tanstack/react-query";
import { createNewEvent } from "../../util/http.js";

import Modal from "../UI/Modal.jsx";
import EventForm from "./EventForm.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import { queryClient } from "../../util/http.js";

export default function NewEvent() {
  const navigate = useNavigate();
  // useMutation does not automatically send the request when the component renders
  // isPending is true when the request is sent
  // isError, boolean if error response
  // error property contains error details
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: createNewEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["events"], // invalidate all queries with the word "events" in each queryKey
        // exact: true, // invalidate queries with exactly "events" as queryKey
      }); // the query responsible of rendering this section should be reexecuted after submitting the form and before routing to /events
      navigate("/events"); // navigate to the /events route after sending the request
    }, // this code only executes if the mutation succeeds
  });

  function handleSubmit(formData) {
    // sent the request when the form is submitted
    mutate({ event: formData });
    // navigate('/events'); // navigate to the /events route after sending the request
  }

  return (
    <Modal onClose={() => navigate("../")}>
      <EventForm onSubmit={handleSubmit}>
        {isPending && "Submitting..."}
        {!isPending && (
          <>
            <Link to='../' className='button-text'>
              Cancel
            </Link>
            <button type='submit' className='button'>
              Create
            </button>
          </>
        )}
      </EventForm>
      {isError && (
        <ErrorBlock
          title='Failed to create event'
          message={
            error.info?.message ||
            "Failed to create event. Please try again later!"
          }
        />
      )}
    </Modal>
  );
}
