import {
  Form,
  useNavigate,
  useNavigation,
  useActionData,
  redirect,
} from "react-router-dom";

import classes from "./EventForm.module.css";

function EventForm({ method, event }) {
  const data = useActionData(); // gives us access to the data returned by the action
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  function cancelHandler() {
    navigate("..");
  }

  // Form component hits preventDefault and sends the Form data to your action in this route.
  // you could send the action to another path setting action="/any-route"
  return (
    <Form method={method} className={classes.form}>
      {data && data.errors && (
        <ul>
          {Object.values(data.errors).map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}
      <p>
        <label htmlFor='title'>Title</label>
        <input
          id='title'
          type='text'
          name='title'
          required
          defaultValue={event ? event.title : ""}
        />
      </p>
      <p>
        <label htmlFor='image'>Image</label>
        <input
          id='image'
          type='url'
          name='image'
          required
          defaultValue={event ? event.image : ""}
        />
      </p>
      <p>
        <label htmlFor='date'>Date</label>
        <input
          id='date'
          type='date'
          name='date'
          required
          defaultValue={event ? event.date : ""}
        />
      </p>
      <p>
        <label htmlFor='description'>Description</label>
        <textarea
          id='description'
          name='description'
          rows='5'
          required
          defaultValue={event ? event.description : ""}
        />
      </p>
      <div className={classes.actions}>
        <button type='button' onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button disabled={isSubmitting}>
          {isSubmitting ? "Submitting" : "Save"}
        </button>
      </div>
    </Form>
  );
}

export default EventForm;

// triggered by children Form, EventForm.js which is in the same route
export async function action({ request, params }) {
  const method = request.method;
  console.log(request)
  const data = await request.formData();

  const eventData = {
    title: data.get("title"),
    image: data.get("image"),
    date: data.get("date"),
    description: data.get("description"),
  }; // receives input 'names' from the Form

  let url = "http://172.30.210.50:8080/events";

  if (method === "PATCH") {
    const eventId = params.eventId;  // access the route
    url = "http://172.30.210.50:8080/events/" + eventId;
  }

  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventData),
  });

  // if this code status, return the response
  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: "Could not save event!" }), {
      status: 500,
    });
  }

  return redirect("/events"); // redirects to this PATH after
}
