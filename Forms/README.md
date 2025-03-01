## Forms in React
Simple `Login.jsx` and more complex form `Signup.jsx`.

`StateLogin.jsx` functionality delegated to a custom hook `./hooks/useInput.js`

Form validation methods:

- upon submission (using state) -> Good idea even if you validate on every keystroke  `Signup.jsx`
- based on keystroke approach and blur (focus on element) `StateLogin.jsx`

NOTES:

- `required` prop can be used on input elements
- <label htmlFor> is the replace for for property in native HTML
- buttons inside a <form></form> will generate requests and send it to the server that is serving the site
- **button type="button"** will NOT submit the form
- **button type="reset"** inside a form, resets the form
- onBlur event is fired when an input element loses focus