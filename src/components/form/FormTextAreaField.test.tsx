import { render } from "@testing-library/react";
import FormTextAreaField from "./FormTextAreaField";

describe("Text Area Field", () => {
  it("renders with a given label", () => {
    const label = "Add Test Area Text";
    const { getByText } = render(
      <FormTextAreaField
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
