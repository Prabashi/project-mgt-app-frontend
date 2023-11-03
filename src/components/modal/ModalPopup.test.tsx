import { render, screen, fireEvent, getByText } from "@testing-library/react";
import ModalPopup from "./ModalPopup";
import AddTaskPopup from "../task/AddTaskPopup";

describe("renders modal popup with a given title", () => {
  it("should show the given title", () => {
    render(
      <ModalPopup title="Title">
        <h1>Test</h1>
      </ModalPopup>
    );
    const pElement = screen.getByText(/title/i);
    expect(pElement).toBeInTheDocument();
    expect(pElement).toBeInTheDocument();
  });
  // it('renders the component with add, edit, delete, and view options', () => {
  //     render(<MyComponent />);

  //     // Verify the presence of add, edit, delete, and view buttons
  //     expect(screen.getByText('Add')).toBeInTheDocument();
  //     expect(screen.getByText('Edit')).toBeInTheDocument();
  //     expect(screen.getByText('Delete')).toBeInTheDocument();
  //     expect(screen.getByText('View')).toBeInTheDocument();
  //   });
});
