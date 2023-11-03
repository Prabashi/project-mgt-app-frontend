import React from "react";
import TextField from "@mui/material/TextField";

type FormTextAreaFieldProps = {
  label: string;
  name: string;
  value: string | null;
  isRequired: boolean | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function FormTextAreaField({
  label,
  name,
  value,
  isRequired,
  onChange,
}: FormTextAreaFieldProps) {
  return (
    <TextField
      id={"text-field-" + name}
      multiline
      rows={4}
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
