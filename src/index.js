import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "../src/components/Apps/App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import {MuiThemeProvider} from "@material-ui/core/styles";

ReactDOM.render(
  <MuiThemeProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </MuiThemeProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
