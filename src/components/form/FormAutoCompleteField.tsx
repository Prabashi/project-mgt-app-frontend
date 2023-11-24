import React, { SyntheticEvent } from "react";
import TextField from "@mui/material/TextField";
import { Autocomplete } from "@mui/material";

type FormTextFieldProps = {
  label: string;
  name: string;
  options: any[];
  value: any;
  isRequired: boolean | undefined;
  isDisabled?: boolean | undefined;
  onChange: (
    event: SyntheticEvent<Element, Event>,
    value: any,
    name: string
  ) => void;
};

export default function FormAutoCompleteField({
  label,
  name,
  options,
  value,
  isRequired,
  isDisabled,
  onChange,
}: FormTextFieldProps) {
  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option) => option.name}
      id={"auto-complete-" + name}
      value={value}
      disabled={isDisabled}
      onChange={(e, value) => onChange(e, value, name)}
      size="small"
      fullWidth
      renderInput={(params) => (
        <TextField
          required={isRequired}
          {...params}
          label={label}
          variant="outlined"
        />
      )}
    />
  );
}
