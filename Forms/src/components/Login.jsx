import { useRef, useState } from "react";

export default function Login() {
  const [emailIsInvalid, setEmailIsInvalid] = useState();

  const email = useRef();
  const password = useRef();

  function handleSubmit(event) {
    event.preventDefault(); // prevent the default browser behavior of sending the http request

    const enteredEmail = email.current.value;
    const enteredPassword = password.current.value;
    console.log(enteredEmail, enteredPassword);

    const emailIsValid = enteredEmail.includes("@"); // ! -> negate the boolean

    if (!emailIsValid) {
      setEmailIsInvalid(true);
      return; // finish submit execution
    }

    setEmailIsInvalid(false);

    // sending HTTP request...
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className='control-row'>
        <div className='control no-margin'>
          <label htmlFor='email'>Email</label>
          <input id='email' type='email' name='email' ref={email} />
          <div className='control-error'>
            {emailIsInvalid && <p>Please enter a valid email!</p>}
          </div>
        </div>

        <div className='control no-margin'>
          <label htmlFor='password'>Password</label>
          <input id='password' type='password' name='password' ref={password} />
        </div>
      </div>

      <p className='form-actions'>
        <button className='button button-flat'>Reset</button>
        <button className='button'>Login</button>
      </p>
    </form>
  );
}
//<button type="button" will NOT submit the form
