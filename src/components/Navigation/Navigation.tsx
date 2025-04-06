import React from "react";
import { NavLink } from "react-router-dom";

interface NavigationLinkProps {
  to: string;
  label: string;
}

const NavigationLink: React.FC<NavigationLinkProps> = ({ to, label }) => {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) => (isActive ? "active-link" : "")}
      >
        {label}
      </NavLink>
    </li>
  );
};

const Navigation: React.FC = () => {
  return (
    <nav>
      <h1>This is the navigation</h1>
      <ol className="header-navigation">
        <NavigationLink to="/" label="Home" />
        <NavigationLink to="/login" label="Login" />
        <NavigationLink to="/registration" label="Registration" />
      </ol>
    </nav>
  );
};

export default Navigation;
