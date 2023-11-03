import React, { SyntheticEvent } from "react";
import FormAutoCompleteField from "../form/FormAutoCompleteField";
import { useAppSelector } from "../../hooks/redux-hooks";

type AssigneeAutoCompleteFieldProps = {
  value: string | null | undefined;
  //   isRequired: boolean | undefined;
  //   isDisabled?: boolean | undefined;
  onChange: (
    event: SyntheticEvent<Element, Event>,
    value: string | null,
    name: string
  ) => void;
};

export default function AssigneeAutoCompleteField({
  value,
  onChange,
}: AssigneeAutoCompleteFieldProps) {
  const options = useAppSelector((state) => state.users.users);

  return (
    <>
      <FormAutoCompleteField
        label="Assignee"
        name="assignee"
        options={options}
        value={value}
        isRequired={true}
        onChange={onChange}
      />
    </>
  );
}
