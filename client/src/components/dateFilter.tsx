import React from "react";
import styled from "styled-components";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1em;

  label {
    margin-right: 0.5em;
  }
`;

type DateFilterProps = {
  onChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  currentVal: string;
};

const DateFilter = ({ onChange, currentVal }: DateFilterProps) => {
  return (
    <Container>
      <label id="date-filter-select">Show results for:</label>
      <Select
        labelId="date-filter-select"
        value={currentVal}
        onChange={onChange}
      >
        <MenuItem value="all">all time</MenuItem>
        <MenuItem value="sixMonths">last six months</MenuItem>
      </Select>
    </Container>
  );
};

export default DateFilter;
