import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "./app.css";

import getNotes from "./utils/getNotes";

import Button from "@material-ui/core/Button";
import AddNoteModal from "./components/addNoteModal";
import { NoteGroup } from "./components/note";
import DateFilter from "./components/dateFilter";

const Container = styled.div`
  padding: 1em;
  h1 {
    margin: 0;
  }

  @media screen and (min-width: 950px) {
    padding: 0;
    display: flex;
    aside {
      width: 20%;
      margin: -1em 1em 0 -1em;
      background-color: #dbf0fe;
      padding: 2em;
    }

    main {
      width: 80%;
      padding: 1em 8em;
      height: 100vh !important;
      overflow-y: scroll;
      box-sizing: border-box;
    }
  }
`;

function App() {
  const [notes, setNotes] = useState([]);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [timeFilter, setTimeFilter] = useState("sixMonths");

  const handleTimeFilterChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => setTimeFilter(event.target.value as string);

  const updateNotes = async () => {
    const data = await getNotes(timeFilter);

    setNotes(data);
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    updateNotes();
  }, [timeFilter]);

  return (
    <Container>
      <aside>
        <h1>A lovely board of notes</h1>
        <p>
          Use this space to view some notes, or add a new one if you're feeling
          wild.
        </p>
        <h2>Controls</h2>
        <Button variant="contained" color="primary" onClick={handleModalOpen}>
          Add note
        </Button>
        <h2>Filters</h2>
        <p>Number of notes: {notes.length}</p>
        <DateFilter onChange={handleTimeFilterChange} currentVal={timeFilter} />
      </aside>
      <main>{notes.length > 0 && <NoteGroup notes={notes} />}</main>
      <AddNoteModal
        isOpen={modalOpen}
        onClose={handleModalClose}
        submitCallback={updateNotes}
      />
    </Container>
  );
}

export default App;
