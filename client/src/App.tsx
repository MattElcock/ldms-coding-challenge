import React, { useEffect, useState } from "react";
import "./app.css";

import { NoteGroup } from "./note";

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const apiURL = "http://localhost:3000/api/notes";

    fetch(apiURL)
      .then((result) => result.json())
      .then((data) => {
        if (data.length) {
          setNotes(data);
        }
      });
  }, []);

  return (
    <div>
      <header>
        <h1>A lovely board of notes</h1>
        <p>
          Use this space to view some lovely notes, or add a new one if you're
          feeling wild.
        </p>
      </header>
      <main>{notes.length > 0 && <NoteGroup notes={notes} />}</main>
    </div>
  );
}

export default App;
