import { render } from "@testing-library/react";
import FormTextField from "./FormTextField";

describe("Text Field", () => {
  it("renders with a given label", () => {
    const label = "Add Test Text";
    const { getByText } = render(
      <FormTextField
        label={label}
        name="test"
        value=""
        isRequired={true}
        onChange={(e) => {}}
      />
    );
    const field = getByText(label);
    expect(field).toBeInTheDocument();
  });
});
