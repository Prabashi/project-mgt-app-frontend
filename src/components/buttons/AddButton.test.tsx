import { fireEvent, render } from "@testing-library/react";
import AddButton from "./AddButton";

describe("Add Button", () => {
  it("shows the text given through props", () => {
    let clickAction = jest.fn();
    const text = "Add Test";
    const { getByText } = render(
      <AddButton text={text} onClickAction={clickAction} />
    );
    const button = getByText(text);
    expect(button).toBeInTheDocument();
  });

  it("executes the callback function on click", () => {
    let clickAction = jest.fn();
    const text = "Add Test";
    const { getByText } = render(
      <AddButton text={text} onClickAction={clickAction} />
    );
    const button = getByText(text);
    fireEvent.click(button);
    expect(clickAction).toBeCalled();
  });
});
