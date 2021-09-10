import React from "react";
import styled from "styled-components";

import { Paper } from "@material-ui/core";

const StyledPaper = styled(Paper)`
  display: flex;
  flex-direction: column;
  width: 14.5em;
  height: 14.5em;
  background-color: yellow !important;
  border-radius: 0;
  padding: 0.5em;
  box-sizing: border-box;
  margin-bottom: 1em;
  position: relative;
`;

const Content = styled.p`
  overflow: auto;
  word-wrap: break-word;
  font-size: 0.8em;
  margin-bottom: 1em;
`;

const Metadata = styled.div`
  margin-top: auto;

  p {
    margin: 0;
    font-size: 0.7em;
  }
`;

export const NoteGroup = styled.div`
  display: flex;
  flex-flow: row wrap;

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
  const datePosted = new Date(createdAt).toDateString();

  return (
    <StyledPaper elevation={3} data-test={`note-${id}`}>
      <Content>{note}</Content>
      <Metadata>
        <p>Author: {user}</p>
        <p>Date posted: {datePosted}</p>
      </Metadata>
    </StyledPaper>
  );
};

export default Note;
