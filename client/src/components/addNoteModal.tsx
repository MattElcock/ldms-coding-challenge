import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: "absolute",
      top: "calc(50% - 10em)",
      left: "calc(50% - 10em)",
      width: "20em",
      height: "20em",
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    textField: {
      marginBottom: ".5em",
    },
  })
);

const Container = styled.div`
  width: 10em;
  height: 10em;
  background-color: #fff;
  margin: auto;
  vertical-align: middle;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;

  button {
    margin-right: 1em;
  }
`;

const CharacterLength = styled.p<{ hasError: boolean }>`
  margin: 0;
  margin-bottom: 1em;

  ${(props) => (props.hasError ? `color: red;` : ``)}
`;

type AddNoteModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const AddNoteModal = ({ isOpen, onClose }: AddNoteModalProps) => {
  const [noteLength, setNoteLength] = useState<number>(0);

  const noteRef = useRef<HTMLTextAreaElement>(null);
  const classes = useStyles();

  const handleSubmitForm = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (noteRef.current) {
      const noteText = noteRef.current.value;
      console.log(noteText);
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Container className={classes.paper}>
        <h2>Add a note</h2>
        <p>Use the box below to add a note.</p>
        <Form onSubmit={handleSubmitForm}>
          <TextField
            required
            inputRef={noteRef}
            label="Note text"
            multiline
            minRows={4}
            maxRows={4}
            variant="outlined"
            onChange={(e) => setNoteLength(e.target.value.length)}
            className={classes.textField}
            error={noteLength > 500}
            helperText={
              noteLength > 500 &&
              "Your note must be no longer than 500 characters."
            }
          />
          <CharacterLength hasError={noteLength > 500}>
            {noteLength}/500 characters
          </CharacterLength>
          <ButtonGroup>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={noteLength > 500}
            >
              Submit
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                onClose();
                setNoteLength(0);
              }}
            >
              Cancel
            </Button>
          </ButtonGroup>
        </Form>
      </Container>
    </Modal>
  );
};

export default AddNoteModal;
