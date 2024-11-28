import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Button } from "./Button";

test("renders children", () => {
  render(<Button onClick={() => {}} text="Click me" />);
  const button = screen.getByRole("button");
  expect(button).toHaveTextContent("Click me");
});

test("button is disabled when disabledProp is true", () => {
  render(
    <Button onClick={() => {}} text="Click me" disabled />
  );
  const button = screen.getByRole("button");
  expect(button).toBeDisabled();
});

test("button is not clickable when disabled", () => {
  const handleClick = jest.fn();
  render(
    <Button onClick={handleClick} text="Click me" disabled />
  );
  const button = screen.getByRole("button");
  fireEvent.click(button);
  expect(handleClick).not.toHaveBeenCalled();
});

test("button is active when isActive prop is true", () => {
  render(
    <Button onClick={() => {}} text="Click me" isActive />
  );
  const button = screen.getByRole("button");
  expect(button).toHaveClass("bg-white text-black");
});

test("button has correct class when isActive is false", () => {
  render(
    <Button onClick={() => {}} text="Click me" isActive={false} />
  );
  const button = screen.getByRole("button");
  expect(button).toHaveClass("bg-gray-300");
});

test("button onClick is triggered when not disabled", () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick} text="Click me" />);
  const button = screen.getByRole("button");
  fireEvent.click(button);
  expect(handleClick).toHaveBeenCalledTimes(1);
});

test("button has custom className when passed", () => {
  render(
    <Button onClick={() => {}} text="Click me" className="custom-class" />
  );
  const button = screen.getByRole("button");
  expect(button).toHaveClass("custom-class");
});
