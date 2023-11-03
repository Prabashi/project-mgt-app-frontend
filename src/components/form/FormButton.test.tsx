import { render } from "@testing-library/react";
import FormButton from "./FormButton";
import { ButtonColor } from "../../constants";

describe("form button", () => {
  it("renders with given text", () => {
    const buttonText = "Test";
    const { getByText } = render(
      <FormButton
        color={ButtonColor.Secondary}
        text={buttonText}
        onClick={() => {}}
      />
    );
    const button = getByText(buttonText);
    expect(button).toBeInTheDocument();
  });
});
