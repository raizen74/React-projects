import { useRouteError } from "react-router-dom";
import PageContent from "../components/PageContent";
import MainNavigation from "../components/MainNavigation";

export default function ErrorPage() {
  const error = useRouteError();
  let title = "An error ocurred!";
  let message = "Something went wrong";
  if (error.status === 500) {
    message = JSON.parse(error.data).message; // When using Response in Events.js
    // message = error.data.message; // when using json from react-Router
  }
  if (error.status === 404) {
    // default error for invalid routes
    title = "Not found!";
    message = "Could not find resource or page.";
  }
  return (
    <>
      <MainNavigation />
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
}
