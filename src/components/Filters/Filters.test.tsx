import { render, screen, fireEvent } from "@testing-library/react";
import { Filters } from "./Filters";

describe("Filters to search for assests", () => {
  // Test 1: Clicking on image filter
  test("clicking on image filter", () => {
    const mockOnFilterChange = jest.fn();
    render(<Filters filter={"image"} onFilterChange={mockOnFilterChange} />);

    const imageButton = screen.getByText("Images");
    fireEvent.click(imageButton);

    expect(mockOnFilterChange).toHaveBeenCalledWith("image");
  });

  // Test 2: Clicking on video filter
  test("clicking on video filter", () => {
    const mockOnFilterChange = jest.fn();
    render(<Filters filter={"image"} onFilterChange={mockOnFilterChange} />);

    const videoButton = screen.getByText("Videos");
    fireEvent.click(videoButton);

    expect(mockOnFilterChange).toHaveBeenCalledWith("video");
  });

  // Test 3: Clicking on audio filter
  test("clicking on audio filter", () => {
    const mockOnFilterChange = jest.fn();
    render(<Filters filter={"image"} onFilterChange={mockOnFilterChange} />);

    const audioButton = screen.getByText("Audio");
    fireEvent.click(audioButton);

    expect(mockOnFilterChange).toHaveBeenCalledWith("audio");
  });
});
