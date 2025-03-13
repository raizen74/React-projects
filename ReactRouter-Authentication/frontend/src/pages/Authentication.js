import { redirect, useActionData, useNavigation } from "react-router-dom";
// import AuthForm from "../components/AuthForm";
import { Form, Link, useSearchParams } from "react-router-dom";
import classes from "../components/AuthForm.module.css";

function AuthenticationPage() {
  const data = useActionData(); // access the returned value from the action function
  const navigation = useNavigation(); // gives us access to the form state (pending, etc)
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";
  const isSubmitting = navigation.state === "submitting";
  return (
    <>
      <Form method='post' className={classes.form}>
        <h1>{isLogin ? "Log in" : "Create a new user"}</h1>
        {data && data.errors && (
          <ul>
            {Object.values(data.errors).map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        )}
        {data && data.message && <p>{data.message}</p>}
        <p>
          <label htmlFor='email'>Email</label>
          <input id='email' type='email' name='email' required />
        </p>
        <p>
          <label htmlFor='password'>Password</label>
          <input id='password' type='password' name='password' required />
        </p>
        <div className={classes.actions}>
          <Link to={`?mode=${isLogin ? "signup" : "login"}`}>
            {isLogin ? "Create new user" : "Login"}
          </Link>
          <button disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Save'}</button>
        </div>
      </Form>
    </>
  );
}

export default AuthenticationPage;

// This action will be triggered whenever the AuthForm is submitted,
// the action must be registered in App.js
export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "login";
  console.log("Mode:", mode);

  if (mode !== "login" && mode !== "signup") {
    throw new Promise({ message: "Unsupported mode.", status: 422 });
  }

  const data = await request.formData();
  // console.log("Form Data:", data);
  const email = data.get("email");
  console.log("Email:", email);
  const password = data.get("password");
  console.log("Password:", password);

  const authData = {
    email,
    password,
  };

  const response = await fetch("http://172.30.210.50:8080/" + mode, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });

  if (response.status === 422 || response.status === 401) {
    return response; // you can return the response, React Router will handle it
  }

  if (!response.ok) {
    throw new Promise({ message: "Could not authenticate user.", status: 500 });
  }

  const resData = await response.json();
  const token = resData.token;  // retrieve the token send from the back, store it in browser Local Storage

  localStorage.setItem('token', token); // this is the code executed when we get the token
  const expiration = new Date();
  expiration.setHours(expiration.getHours()+1);
  localStorage.setItem('expiration', expiration.toISOString());

  return redirect("/"); // redirect to the starting page
}
