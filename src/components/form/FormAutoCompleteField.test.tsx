import { render } from "@testing-library/react";
import FormAutoCompleteField from "./FormAutoCompleteField";

describe("Form Auto Complete Selection Field", () => {
  it("renders with a given label", () => {
    const label = "Add Test Auto Select Options";
    const { getByText } = render(
      <FormAutoCompleteField
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
