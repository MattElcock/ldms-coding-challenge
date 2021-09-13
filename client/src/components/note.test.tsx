import React from "react";

import { render } from "@testing-library/react";

import Note, { NoteGroup, NoteProps, NoteGroupProps } from "./note";

describe("An individual note", () => {
  let mockNote: NoteProps;

  beforeEach(() => {
    mockNote = {
      id: 1,
      createdAt: "2021-07-17T18:04:38.040Z",
      user: "Darth Vader",
      note: "This will be a day long remembered. It has seen the end of Kenobi. It will soon see the end of the Rebellion.",
    };
  });

  it("Can render a single note", () => {
    const { getByTestId, getByText } = render(<Note {...mockNote} />);

    const note = getByTestId(`note`);
    const noteContent = getByText(mockNote.note);
    const noteAuthor = getByText(`Author: ${mockNote.user}`);
    const noteDatePosted = getByText(
      `Date posted: ${new Date(mockNote.createdAt).toLocaleDateString()}`
    );

    expect(note).toBeTruthy();
    expect(noteContent).toBeTruthy();
    expect(noteAuthor).toBeTruthy();
    expect(noteDatePosted).toBeTruthy();
  });
});

describe("A group of notes", () => {
  let mockNoteGroup: NoteGroupProps;

  beforeEach(() => {
    mockNoteGroup = {
      notes: [
        {
          id: 1,
          createdAt: "2021-07-17T18:04:38.040Z",
          user: "Darth Vader",
          note: "This will be a day long remembered. It has seen the end of Kenobi. It will soon see the end of the Rebellion.",
        },
        {
          id: 2,
          createdAt: "2021-07-17T18:04:38.040Z",
          user: "Jyn",
          note: "Rebellions are built on hope.",
        },
        {
          id: 3,
          createdAt: "2021-07-17T18:04:38.040Z",
          user: "Chirrut",
          note: "I am one with the Force and the Force is with me.",
        },
        {
          id: 4,
          createdAt: "2021-07-17T18:04:38.040Z",
          user: "Qui-Gon Jinn",
          note: "There’s always a bigger fish.",
        },
      ],
    };
  });

  it("Can render all notes", () => {
    const numOfNotes = mockNoteGroup.notes.length;

    const { queryAllByTestId } = render(<NoteGroup {...mockNoteGroup} />);

    const notes = queryAllByTestId("note");

    expect(notes).toHaveLength(numOfNotes);
  });
});
