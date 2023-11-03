import { render } from "@testing-library/react";
import FormSelectionField from "./FormSelectionField";

describe("Form Selection Field", () => {
  it("renders with a given label", () => {
    const label = "Add Test Select Options";
    const { getByText } = render(
      <FormSelectionField
        label={label}
        name="test"
        value=""
        options={[]}
        isRequired={true}
        onChange={(e) => {}}
      />
    );
    const field = getByText(label);
    expect(field).toBeInTheDocument();
  });
});
