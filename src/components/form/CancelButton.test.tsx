import { render } from "@testing-library/react";
import CancelButton from "./CancelButton";

describe("cancel button", () => {
  it("renders with Cancel text", () => {
    const { getByText } = render(<CancelButton onClick={() => {}} />);
    const button = getByText("Cancel");
    expect(button).toBeInTheDocument();
  });
});
