import React from "react";
import styled from "styled-components";

import Paper from "@material-ui/core/Paper";

const Pin = styled.span`
  height: 1em;
  width: 1em;
  background-image: radial-gradient(#ff6961 50%, black 100%);
  border-radius: 50%;
  display: inline-block;
  align-self: center;
`;

const StyledPaper = styled(Paper)`
  display: flex;
  flex-direction: column;
  width: 17.3em;
  height: 17.3em;
  background-color: #feff9c !important;
  border-radius: 0;
  padding: 0.5em;
  box-sizing: border-box;
  margin-bottom: 1em;
  position: relative;
`;

const Content = styled.p`
  overflow: auto;
  word-wrap: break-word;
  font-size: 1em;
  margin: 0;
  margin-bottom: 1em;
`;

const Metadata = styled.div`
  margin-top: auto;

  p {
    margin: 0;
    font-size: 0.8em;
  }
`;

const Board = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-flow: row wrap;
  padding 1em;
  background-color: #ac795d;
  border: .65em solid #76513d;
  box-shadow: 5px 10px 8px 5px #888888;

  ${StyledPaper} {
    margin-right: 1em;

    &:last-child {
      margin-left: 0;
    }
  }
`;

type NoteProps = {
  id: number;
  createdAt: string;
  user: string;
  note: string;
};

const Note = ({ id, createdAt, user, note }: NoteProps) => {
  const datePosted = new Date(createdAt).toLocaleDateString();

  return (
    <StyledPaper square elevation={3} data-test={`note-${id}`}>
      <Pin />
      <Content>{note}</Content>
      <Metadata>
        <p>Author: {user}</p>
        <p>Date posted: {datePosted}</p>
      </Metadata>
    </StyledPaper>
  );
};

type NoteGroupProps = {
  notes: NoteProps[];
};

export const NoteGroup = ({ notes }: NoteGroupProps) => (
  <Board>
    {notes.map((note) => (
      <Note {...note} />
    ))}
  </Board>
);
export default Note;
