import React, { useEffect, useState } from "react";
import "./app.css";

import { NoteGroup } from "./note";
import DateFilter from "./dateFilter";

function App() {
  const [notes, setNotes] = useState([]);
  const [timeFilter, setTimeFilter] = useState("sixMonths");

  const handleTimeFilterChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => setTimeFilter(event.target.value as string);

  useEffect(() => {
    const url = new URL("http://localhost:3000/api/notes");

    if (timeFilter === "sixMonths") {
      const date = new Date();
      date.setMonth(date.getMonth() - 6);
      url.searchParams.append("from", date.toISOString().split("T")[0]);
    }

    fetch(url.toString())
      .then((result) => result.json())
      .then((data) => {
        if (data.length) {
          setNotes(data);
        }
      });
  }, [timeFilter]);

  return (
    <div>
      <header>
        <h1>A lovely board of notes</h1>
        <p>
          Use this space to view some lovely notes, or add a new one if you're
          feeling wild.
        </p>
      </header>
      <main>
        <DateFilter onChange={handleTimeFilterChange} currentVal={timeFilter} />
        {notes.length > 0 && <NoteGroup notes={notes} />}
      </main>
    </div>
  );
}

export default App;
