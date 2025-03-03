## Form actions
**Requires React 19+**

### Backend
`npm install` and `npm start` 

`Signup.jsx` -> the form action="" property is used to specify the URL to send the form information upon submission. React overides this prop, you trigger a function that is executed uphon submission

- `useActionState` hook that triggers form actions when form is submitted `NewOpinion.jsx`
- button type='submit' -> triggers form submission, check `Submit.jsx`
- `useFormStatus` hook to manage form buttons state (submission pending), check `Submit.jsx`
- `Opinion.jsx` `button formAction` -> register multiple form actions if you have multiple buttons
- `useOptimistic` hook, explained in `Opinion.jsx`