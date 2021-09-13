import { render, fireEvent, within } from "@testing-library/react";

import DateFilter from "./dateFilter";

describe("Date filter", () => {
  let currentValue: string;
  let onChange = jest.fn();

  beforeEach(() => {
    currentValue = "sixMonths";
  });

  it("Can render", () => {
    const { getByText } = render(
      <DateFilter onChange={onChange} currentVal={currentValue} />
    );

    const label = getByText("Show results for:");
    const selectedOption = getByText("last six months");

    expect(label).toBeTruthy();
    expect(selectedOption).toBeTruthy();
  });

  it("Calls the onChange function when a new selection is made", () => {
    const { getByRole } = render(
      <DateFilter onChange={onChange} currentVal={currentValue} />
    );

    fireEvent.mouseDown(getByRole("button"));

    const listbox = within(getByRole("listbox"));

    fireEvent.click(listbox.getByText(/all time/i));

    expect(onChange.mock.calls).toHaveLength(1);
  });
});
