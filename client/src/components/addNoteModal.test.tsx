import { render, fireEvent } from "@testing-library/react";

import AddNoteModal from "./addNoteModal";

describe("Date filter", () => {
  const mockOnClose = jest.fn();
  const mockSubmitCallback = jest.fn();

  it("Updates the character count as the user types a note", () => {
    const { getByLabelText, getByText } = render(
      <AddNoteModal
        isOpen={true}
        onClose={mockOnClose}
        submitCallback={mockSubmitCallback}
      />
    );

    const input = getByLabelText("Note text *") as HTMLInputElement;

    const characterLength = getByText("0/500 characters");
    expect(characterLength).toBeTruthy();

    fireEvent.change(input, {
      target: {
        value:
          "Once you start down the dark path, forever will it dominate your destiny.",
      },
    });

    expect(input.value).toBe(
      "Once you start down the dark path, forever will it dominate your destiny."
    );

    const characterLengthNew = getByText("73/500 characters");
    expect(characterLengthNew).toBeTruthy();
  });

  it("Shows an error message when the note is above 500 characters long", () => {
    const { getByLabelText, getByText, queryByText } = render(
      <AddNoteModal
        isOpen={true}
        onClose={mockOnClose}
        submitCallback={mockSubmitCallback}
      />
    );

    const input = getByLabelText("Note text *") as HTMLInputElement;

    const characterLength = getByText("0/500 characters");
    expect(characterLength).toBeTruthy();

    const errorMessage = queryByText(
      "Your note must be no longer than 500 characters."
    );
    expect(errorMessage).toBeFalsy();

    fireEvent.change(input, {
      target: {
        value:
          "zRsk6JVBGHlwe88bzDR6FMSQ2ttzRWANtbaZ5qPrOjdcVnEWQe4m61fIji52vjgq0bVu5X1oQgrPq0bANMWdIeQbPJKdwRU2rNHtsRTEpbgI0A2oBsfMWBHNHfqxHE0WCci1Tb6CWgu2SaXfgyRIqX7pOKyOXK05OgKHQD0jYP5T8pbcijpKbii3tJY8J4kVfZlFVxS5VRRByLcXwWbrJnH8zoZvALJu5482VHNXRuVN7Fsk2N0QUaHFQ3L1S1eQWH81U14xhoKOnfspnDLbCRKXRHI0A9w1wlLKPcj47PgAocY2nBdgzroWyxyOxU95itpNwMNVbLtKsFTxImeK4rLNlOIRCxE9GqrG7HcbznrtIf2OLgX1uBFnvuBVLhdjev3Q8hBMTyerkVEZyI64DSF9OcBF1cwRrBA7sktenenZ7NddIecYiPPBTrFLsiRFEp8D27q6osLJrYbt5JQHeQsotTe6vZyosZQqbCjmcoFVB9lMynlVd",
      },
    });

    const characterLengthNew = getByText("501/500 characters");
    expect(characterLengthNew).toBeTruthy();

    const errorMessageNew = getByText(
      "Your note must be no longer than 500 characters."
    );
    expect(errorMessageNew).toBeTruthy();
  });
});
