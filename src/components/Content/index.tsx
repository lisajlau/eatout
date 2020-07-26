import * as React from "react";
import { FC } from "react";
import styled from "styled-components";
import { fadeGray } from "../../styles/tokens";

const NavBar = styled.div`
  background-color: black;
  height: calc(100vh - 72px);
`;

const Content: FC<{}> = () => {
  return (
    <div className="container">
      <NavBar>header</NavBar>
    </div>
  );
};

export default Content;
