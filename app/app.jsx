import React from "react";
import { render } from "react-dom";
import { Route, Router, IndexRoute, hashHistory } from "react-router";
import Main from "Main";
import "style!css!applicationStyles";

render(<Main />, document.getElementById("react-container"));
