import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

// Outlet is where the children will be rendered, check App.js
export default function RootLayout() {
  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
}
