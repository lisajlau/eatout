import * as React from "react";
import * as ReactDOM from "react-dom";
import "./styles/normalize.css";
import "./styles/skeleton.css";
import "./styles/global.css";

import App from "./components/App";

var mountNode = document.getElementById("app");
ReactDOM.render(<App />, mountNode);
