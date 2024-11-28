import { render, screen, fireEvent } from "@testing-library/react";
import { InputField } from "./InputField";

test("renders input field and allows user input", () => {
    const handleChange = jest.fn();
    render(<InputField value="" onChange={handleChange} />);
    
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
    
    fireEvent.change(input, { target: { value: "Test input" } });
    expect(handleChange).toHaveBeenCalledWith("Test input");
});