import React from "react";
import TextField from "@mui/material/TextField";

type FormTextFieldProps = {
  label: string;
  name: string;
  value: string | null;
  isRequired: boolean | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function FormTextField({
  label,
  name,
  value,
  isRequired,
  onChange,
}: FormTextFieldProps) {
  return (
    <TextField
      id={"text-field-" + name}
      label={label}
      variant="outlined"
      name={name}
      value={value}
      onChange={onChange}
      size="small"
      required={isRequired}
      fullWidth
      // error={!isFieldValueValid("email")}
    />
  );
}
