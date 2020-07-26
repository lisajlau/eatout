import * as React from "react";
import { FC, useCallback } from "react";
import { useLocalStorage } from "react-use";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { bostonBlue, spacer24, fadeGray, doveGray } from "../../styles/tokens";
import { Cookies } from "../../services/constant";
import { Role } from "../../services/api";

const Nav = styled.nav`
  padding: ${spacer24};
  background-color: ${bostonBlue};
  height: 20px;
  line-height: 20px;
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

const Logo = styled(Link)`
  float: left;
  font-size: 1.5em;
  color: ${fadeGray};
  text-decoration: none;
  &:hover {
    color: ${doveGray};
  }
`;

type HeaderProps = {
  login?: boolean;
};

const Header: FC<HeaderProps> = ({ login }) => {
  const [, , removeUserLogin] = useLocalStorage(Cookies.UserLogin);
  let location = useLocation();
  const userLogin = JSON.parse(localStorage.getItem(Cookies.UserLogin));
  const admin = userLogin && userLogin.role === Role.Owner;
  const onLogout = useCallback(() => {
    removeUserLogin();
    return false;
  }, [userLogin]);
  return (
    <Nav>
      <Logo to="/">EatOUT</Logo>
      <NavBar>
        {admin && (
          <NavLink>
            <Link to="/myrestaurants">My restaurants</Link>
          </NavLink>
        )}
        {userLogin && (
          <NavLink>
            <Link to="/myorders">My orders</Link>
          </NavLink>
        )}
        {login && (
          <NavLink>
            {userLogin ? (
              <a onClick={onLogout} href="/">
                Logout {userLogin.name}
              </a>
            ) : (
              <Link to={`/login?from=${location.pathname}`}>Login</Link>
            )}
          </NavLink>
        )}
      </NavBar>
    </Nav>
  );
};

export default Header;
