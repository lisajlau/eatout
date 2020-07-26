import * as React from "react";
import { FC } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { bostonBlue, spacer24, fadeGray } from "../../styles/tokens";

const Nav = styled.nav`
  padding: ${spacer24};
  background-color: ${bostonBlue};
`;

const NavBar = styled.ul`
  display: flex;
  justify-content: flex-end;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const NavLink = styled.li`
  margin: 0 20px;
  > a {
    color: ${fadeGray};
    text-decoration: none;
  }
`;

const Logo = styled.h5`
  float: left;
`;

const Header: FC<{}> = () => {
  return (
    <Nav>
      <Logo>EatOUT</Logo>
      <NavBar>
        <NavLink>
          <Link to="/">Home</Link>
        </NavLink>
        <NavLink>
          <Link to="/login">Login</Link>
        </NavLink>
        <NavLink>
          <Link to="/admin">Owners</Link>
        </NavLink>
      </NavBar>
    </Nav>
  );
};

export default Header;
