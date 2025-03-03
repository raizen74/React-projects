import { useFormStatus } from "react-dom";

export default function Submit() {
  const { pending } = useFormStatus(); // pending is a boolean depending on the form is being submitted

  return (
    <p className='actions'>
      <button type='submit' disabled={pending}>
        {pending ? "Submitting..." : "Submit"}
      </button>
    </p>
  );
}
