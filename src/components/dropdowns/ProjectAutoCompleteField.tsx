import React, { SyntheticEvent } from "react";
import FormAutoCompleteField from "../form/FormAutoCompleteField";
import { useAppSelector } from "../../hooks/redux-hooks";
import { Project } from "../../slices/taskSlice";

type ProjectAutoCompleteFieldProps = {
  value: Project | null;
  //   isRequired: boolean | undefined;
  //   isDisabled?: boolean | undefined;
  onChange: (
    event: SyntheticEvent<Element, Event>,
    value: Project | null,
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
