import { useActionState, use } from "react";
import { OpinionsContext } from "../store/opinions-context";
import Submit from "./Submit";

export function NewOpinion() {
  const { addOpinion } = use(OpinionsContext); // useContext, destructure addOpinion function

  // receives old state and the form as an object -> formData
  // form actions can be async
  async function shareOpinionAction(prevData, formData) {
    const title = formData.get("title");
    const body = formData.get("body");
    const userName = formData.get("userName");

    let errors = [];

    if (title.trim().length < 5) {
      errors.push("Title must have at least 5 chars long.");
    }

    if (body.trim().length < 10 || body.trim().length > 300) {
      errors.push("Opinion must be between 10 and 300 chars long.");
    }

    if (!userName.trim()) {
      // if string is empty
      errors.push("Please provide a user name.");
    }

    if (errors.length > 0) {
      // if string is empty
      return {
        errors,
        enteredValues: {
          title,
          body,
          userName,
        },
      };
    }

    // ... submit to backend, addOpinion is a Promise
    await addOpinion({ title, body, userName });

    return { error: null };
  }

  const [formState, formAction] = useActionState(shareOpinionAction, {
    errors: null,
  });

  return (
    <div id='new-opinion'>
      <h2>Share your opinion!</h2>
      {/* shareOpinionAction runs when form is submitted */}
      <form action={formAction}>
        <div className='control-row'>
          <p className='control'>
            <label htmlFor='userName'>Your Name</label>
            <input
              type='text'
              id='userName'
              name='userName'
              defaultValue={formState.enteredValues?.userName}
            />
          </p>

          <p className='control'>
            <label htmlFor='title'>Title</label>
            <input
              type='text'
              id='title'
              name='title'
              defaultValue={formState.enteredValues?.title}
            />
          </p>
        </div>
        <p className='control'>
          <label htmlFor='body'>Your Opinion</label>
          <textarea
            id='body'
            name='body'
            rows={5}
            defaultValue={formState.enteredValues?.body}
          ></textarea>
        </p>

        {formState.errors && (
          <ul className='errors'>
            {formState.errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}
        <Submit />
      </form>
    </div>
  );
}
