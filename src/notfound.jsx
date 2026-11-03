import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
import ShinobiFx from "./fx/ShinobiFx";

// The eye that follows the cursor is too strong for the homepage, but right for a lost visitor:
// it watches the whole screen, blinks, and spins when clicked.
const NotFound = () => (
  <main className="notfound">
    <span className="chapter__no">Error 404</span>
    <div className="notfound__eye">
      <ShinobiFx kind="eye" interactTarget={document.documentElement} label="An eye searching the page" />
    </div>
    <h1 className="notfound__title">Nothing here.</h1>
    <p className="notfound__note">Even this eye can't find it.</p>
    <a className="btn btn--accent btn--big" href="/">Back home <span>→</span></a>
  </main>
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NotFound />
  </React.StrictMode>
);
