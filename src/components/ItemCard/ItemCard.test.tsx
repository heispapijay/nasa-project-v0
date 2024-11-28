import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ItemCard } from "./ItemCard";
import { MediaAssets } from "../../services/api";

// asset data
const mockAsset: MediaAssets = {
  data: [
    {
      title: "Test NASA Image",
      nasa_id: "test-123",
      description: "A test description",
      media_type: "image",
    },
  ],
  links: [
    {
      href: "https://example.com/test-image.jpg",
    },
  ],
};

// Wrapper to provide routing context
// This is a custom render function that wraps the component in a BrowserRouter
// This is necessary because the ItemCard component uses the Link component from react-router-dom
const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("ItemCard Component", () => {
  test("renders image with correct attributes", () => {
    renderWithRouter(<ItemCard asset={mockAsset} />);
    const image = screen.getByRole("img");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "https://example.com/test-image.jpg");
    expect(image).toHaveAttribute("alt", "Test NASA Image");
  });

  test("renders title correctly", () => {
    renderWithRouter(<ItemCard asset={mockAsset} />);

    // Check title
    const titleElement = screen.getByText("Test NASA Image");
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveClass("text-base");
    expect(titleElement).toHaveClass("font-semibold");
  });

  test("renders as a link with correct route", () => {
    renderWithRouter(<ItemCard asset={mockAsset} />);
    const linkElement = screen.getByRole("link");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "/asset/test-123");
  });
});
