//<button type="button" will NOT submit the form
//<button type="reset"> inside a form, resets the form

import { useState } from "react";

export default function Signup() {
  // state to check if password and confirm password are equal
  const [passwordsAreNotEqual, setPasswordsAreNotEqual] = useState(false);
  function handleSubmit(event) {
    event.preventDefault(); // prevent the default browser behavior of sending the http request

    const fd = new FormData(event.target); // built into the browser
    // fd.get('email') // get the "name" property of a <input> element
    const acquisitionChannel = fd.getAll("acquisition"); // Manually extracting multi input fields (checkboxes with name='acquisition')
    const data = Object.fromEntries(fd.entries()); // object that extracts all entries
    data.acquisition = acquisitionChannel;

    if (data.password !== data["confirm-password"]) {
      // access the <input name="confirm-password"
      setPasswordsAreNotEqual(true);
      return;
    }

    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Welcome on board!</h2>
      <p>We just need a little bit of data from you to get you started 🚀</p>

      <div className='control'>
        <label htmlFor='email'>Email</label>
        <input id='email' type='email' name='email' required />
      </div>

      <div className='control-row'>
        <div className='control'>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            name='password'
            required
            minLength={6}
          />
        </div>

        <div className='control'>
          <label htmlFor='confirm-password'>Confirm Password</label>
          <input
            id='confirm-password'
            type='password'
            name='confirm-password'
          />
          <div className='control-error'>
            {passwordsAreNotEqual && <p>Passwords must match.</p>}
          </div>
        </div>
      </div>

      <hr />

      <div className='control-row'>
        <div className='control'>
          <label htmlFor='first-name'>First Name</label>
          <input type='text' id='first-name' name='first-name' required />
        </div>

        <div className='control'>
          <label htmlFor='last-name'>Last Name</label>
          <input type='text' id='last-name' name='last-name' required />
        </div>
      </div>

      <div className='control'>
        <label htmlFor='phone'>What best describes your role?</label>
        <select id='role' name='role' required>
          <option value='student'>Student</option>
          <option value='teacher'>Teacher</option>
          <option value='employee'>Employee</option>
          <option value='founder'>Founder</option>
          <option value='other'>Other</option>
        </select>
      </div>

      <fieldset>
        <legend>How did you find us?</legend>
        <div className='control'>
          <input
            type='checkbox'
            id='google'
            name='acquisition'
            value='google'
          />
          <label htmlFor='google'>Google</label>
        </div>

        <div className='control'>
          <input
            type='checkbox'
            id='friend'
            name='acquisition'
            value='friend'
          />
          <label htmlFor='friend'>Referred by friend</label>
        </div>

        <div className='control'>
          <input type='checkbox' id='other' name='acquisition' value='other' />
          <label htmlFor='other'>Other</label>
        </div>
      </fieldset>

      <div className='control'>
        <label htmlFor='terms-and-conditions'>
          <input
            type='checkbox'
            id='terms-and-conditions'
            name='terms'
            required
          />
          I agree to the terms and conditions
        </label>
      </div>

      <p className='form-actions'>
        <button type='reset' className='button button-flat'>
          Reset
        </button>
        <button type='submit' className='button'>
          Sign up
        </button>
      </p>
    </form>
  );
}
