import React, { ReactNode } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

type FormTextFieldProps = {
  label: string;
  name: string;
  value: string | null | undefined;
  options: string[];
  isRequired: boolean | undefined;
  isDisabled?: boolean | undefined;
  onChange: (event: SelectChangeEvent<string | null>, child: ReactNode) => void;
};

export default function FormSelectionField({
  label,
  name,
  value,
  options,
  isRequired,
  isDisabled,
  onChange,
}: FormTextFieldProps) {
  return (
    <>
      <FormControl required fullWidth variant="outlined" size="small">
        <InputLabel id={"input-label-" + name}>{label}</InputLabel>
        <Select
          labelId={"input-label-" + name}
          id={"input-select-" + name}
          value={value}
          name={name}
          disabled={isDisabled}
          onChange={onChange}
          label={label}
          fullWidth
        >
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}
