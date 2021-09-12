import React, { useEffect, useState } from "react";
import "./app.css";

import AddNoteModal from "./components/addNoteModal";
import { NoteGroup } from "./components/note";
import DateFilter from "./components/dateFilter";

function App() {
  const [notes, setNotes] = useState([]);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [timeFilter, setTimeFilter] = useState("sixMonths");

  const handleTimeFilterChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => setTimeFilter(event.target.value as string);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

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
        <button onClick={handleModalOpen}>Add note</button>
        <DateFilter onChange={handleTimeFilterChange} currentVal={timeFilter} />
        {notes.length > 0 && <NoteGroup notes={notes} />}
      </main>
      <AddNoteModal isOpen={modalOpen} onClose={handleModalClose} />
    </div>
  );
}

export default App;
