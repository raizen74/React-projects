// Challenge / Exercise

// 1. Add five new (dummy) page components (content can be simple <h1> elements)
//    - HomePage
//    - EventsPage
//    - EventDetailPage
//    - NewEventPage
//    - EditEventPage
// 2. Add routing & route definitions for these five pages
//    - / => HomePage
//    - /events => EventsPage
//    - /events/<some-id> => EventDetailPage
//    - /events/new => NewEventPage
//    - /events/<some-id>/edit => EditEventPage
// 3. Add a root layout that adds the <MainNavigation> component above all page components
// 4. Add properly working links to the MainNavigation
// 5. Ensure that the links in MainNavigation receive an "active" class when active
// 6. Output a list of dummy events to the EventsPage
//    Every list item should include a link to the respective EventDetailPage
// 7. Output the ID of the selected event on the EventDetailPage
// BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import EventsPage, { loader as eventsLoader } from "./pages/Events";
import EventDetailPage, {
  loader as eventDetailLoader,
  action as deleteEventAction,
} from "./pages/EventDetail";
import NewEventPage from "./pages/NewEvent";
import { action as manipulateEventAction } from "./components/EventForm";
import { action as newsletterAction } from "./pages/Newsletter";
import EditEventPage from "./pages/EditEvent";
import RootLayout from "./pages/Root";
import EventsRootLayout from "./pages/EventsRoot";
import ErrorPage from "./pages/Error";
import NewsletterPage from "./pages/Newsletter";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    // errorElement can show a fallback page for invalid route, and can show errors from any route
    errorElement: <ErrorPage />, // errors bubble up, so errors fetching data in the loader will throw this page
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "events",
        element: <EventsRootLayout />,
        children: [
          {
            index: true,
            element: <EventsPage />,
            // executed by react router when visiting this route
            loader: eventsLoader, // register the loader
          },
          {
            path: ":eventId",
            id: "event.detail", // route id, useful to get the loader from this route
            loader: eventDetailLoader, // shared loader available to siblings and children
            children: [
              {
                index: true,
                element: <EventDetailPage />,
                action: deleteEventAction,
              },
              {
                path: "edit",
                element: <EditEventPage />,
                action: manipulateEventAction, //takes a function,
              },
            ],
          },
          {
            path: "new", // this route will win over /events/:eventId
            element: <NewEventPage />,
            action: manipulateEventAction, //takes a function,
          },
        ],
      },
      {
        path: "newsletter",
        element: <NewsletterPage />,
        action: newsletterAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
