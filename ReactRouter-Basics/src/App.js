import {
  createBrowserRouter,
  // createRoutesFromElements,
  // Route,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/Home";
import ProductsPage from "./pages/Products";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
import ProductDetailPage from "./pages/ProductDetail";

// OPTION 1:
// const routeDefinitions = createRoutesFromElements(
//   <Route>
//     <Route path="/" element={<HomePage/>}/>
//     <Route path="/products" element={<ProductsPage/>}/>
//   </Route>
// )
// const router = createBrowserRouter(routeDefinitions)

// OPTION 2:
const router = createBrowserRouter([
  // each object represents 1 route
  // path for which this route should be active
  // element renders JSX component
  {
    path: "/",  // errors bubble up to this path
    element: <RootLayout />, // parent route, wraps children, the root is always displayed
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> }, // index route, default
      {
        path: "products", // Relative path
        element: <ProductsPage />,
        // errorElement: <ErrorPage />,//loaded when the page throws an Error
      },
      {
        path: "products/:productId", // dynamic PATH segment
        element: <ProductDetailPage />,
      },
    ],
  },
]);

// RouterProvider takes router prop which must be an object created with createBrowserRouter
function App() {
  return <RouterProvider router={router} />;
}

export default App;
