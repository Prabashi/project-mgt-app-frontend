import React, { SyntheticEvent } from "react";
import FormAutoCompleteField from "../form/FormAutoCompleteField";
import { useAppSelector } from "../../hooks/redux-hooks";

type ProjectAutoCompleteFieldProps = {
  value: string | null | undefined;
  //   isRequired: boolean | undefined;
  //   isDisabled?: boolean | undefined;
  onChange: (
    event: SyntheticEvent<Element, Event>,
    value: string | null,
    name: string
  ) => void;
};

export default function ProjectAutoCompleteField({
  value,
  onChange,
}: ProjectAutoCompleteFieldProps) {
  const options = useAppSelector((state) => state.projects.projects);

  return (
    <>
      <FormAutoCompleteField
        label="Project"
        name="project"
        options={options}
        value={value}
        isRequired={true}
        onChange={onChange}
      />
    </>
  );
}
