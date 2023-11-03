import { render } from "@testing-library/react";
import SubmitButton from "./SubmitButton";

describe("Submit button", () => {
  it("renders with Confirm text", () => {
    const { getByText } = render(<SubmitButton onClick={() => {}} />);
    const button = getByText("Confirm");
    expect(button).toBeInTheDocument();
  });
});
