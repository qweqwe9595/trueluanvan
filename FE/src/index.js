import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { TheMovieDbProvider } from "./contexts/TMDB/theMovieDbContext";
import { ConfirmDialogContextProvider } from "./contexts/Dialog/dialogContext";
import { BrowserRouter } from "react-router-dom";
import { UserContextProvider } from "./contexts/User/UserContext";
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <TheMovieDbProvider>
        <UserContextProvider>
          <ConfirmDialogContextProvider>
            <App />
          </ConfirmDialogContextProvider>
        </UserContextProvider>
      </TheMovieDbProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
