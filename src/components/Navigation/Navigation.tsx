import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <div>
      <ol className="header-navigation">
        <NavigationLink to="/" label="Home" />
        <NavigationLink to="/login" label="Login" />
        <NavigationLink to="/registration" label="Registration" />
      </ol>
    </div>
  );
};
export default Navigation;

interface NavigationLinkProps {
  to: string;
  label: string;
}

const NavigationLink: React.FC<NavigationLinkProps> = ({ to, label }) => {
  return (
    <li>
      <NavLink to={to}>{label}</NavLink>
    </li>
  );
};
