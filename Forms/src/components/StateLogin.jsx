//<label htmlFor> is the replace for for property in native HTML
//buttons inside a <form></form> will generate requests and send it to the server that is serving the site
//<button type="button" will NOT submit the form
//<button type="reset"> inside a form, resets the form
// onBlur event is fired when an input element loses focus

// import { useState } from "react";
import Input from "./Input";
import { isEmail, isNotEmpty, hasMinLength } from "../util/validation";
import useInput from "../hooks/useInput";

export default function Login() {
  // DELEGATED TO CUSTOM HOOK
  // const [enteredValues, setEnteredValues] = useState({
  //   email: "",
  //   password: "",
  // });

  // const [didEdit, setDidEdit] = useState({
  //   email: false, // track if a input element is focused
  //   password: false,
  // });
  const {
    value: emailValue,
    handleInputChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
    hasError: emailHasError
  } = useInput("", (value) => isEmail(value) && isNotEmpty(value)); // object destructuring and alias

  const {
    value: passwordValue,
    handleInputChange: handlePasswordChange,
    handleInputBlur: handlePasswordBlur,
    hasError: passwordHasError
  } = useInput('', (value) => hasMinLength(value, 6));

  // DELEGATED TO CUSTOM HOOK: email and password validation
  // const emailIsInvalid =
  //   didEdit.email &&
  //   !isEmail(enteredValues.email) &&
  //   isNotEmpty(enteredValues.email);
  // const passwordIsInvalid =
  //   didEdit.password && !hasMinLength(enteredValues.password, 6); // ! -> negate the boolean

  function handleSubmit(event) {
    event.preventDefault(); // prevent the default browser behavior of sending the http request
    if (emailHasError || passwordHasError) {
      return;
    }
    console.log(emailValue, passwordValue);
  }

  // DELEGATED TO CUSTOM HOOK
  // function handleInputChange(identifier, value) {
  //   // triggered on every keystroke
  //   setEnteredValues((prevValues) => ({
  //     // return an object (you must wrapped in parenthesis)
  //     ...prevValues,
  //     [identifier]: value, // access a key with a variable
  //   }));

  //   setDidEdit((prevEdit) => ({
  //     ...prevEdit,
  //     [identifier]: false, // whenever the user starts typing again we reset the edit
  //   }));
  // }

  // // fires when an input element loses focus
  // function handleInputBlur(identifier) {
  //   setDidEdit((prevEdit) => ({
  //     ...prevEdit,
  //     [identifier]: true,
  //   }));
  // }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className='control-row'>
        <Input
          label='Email'
          id='email'
          type='email'
          name='email'
          // onBlur={() => handleInputBlur("email")}
          onBlur={handleEmailBlur}
          onChange={handleEmailChange}
          // onChange={(event) => handleInputChange("email", event.target.value)}
          value={emailValue}
          error={emailHasError && "Please enter a valid email."}
        />
        <Input
          label='Password'
          id='password'
          type='password'
          name='password'
          onChange={handlePasswordChange}
          onBlur={handlePasswordBlur}
          value={passwordValue}
          error={passwordHasError && "Please enter a valid password."}
        />
      </div>

      <p className='form-actions'>
        <button className='button button-flat'>Reset</button>
        <button className='button'>Login</button>
      </p>
    </form>
  );
}
