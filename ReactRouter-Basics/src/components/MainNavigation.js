// import { Link } from "react-router-dom";  // renders a regular <a></a> element
import { NavLink } from "react-router-dom";
import classes from "./MainNavigation.module.css";
export default function MainNavigation() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to='/'
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end  // this link is only considered active if the path ends with '/'
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/products'
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Products
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
