import { screen, fireEvent, render } from "@testing-library/react";
import { Input } from "./Input";

describe("Input", () => {
  test("render placeholder", () => {
    render(<Input placeholder={"Placeholder text"} />);
    expect(screen.getByText("Placeholder text >")).toBeInTheDocument();
  });

  test("autofocus", () => {
    render(<Input placeholder={"Placeholder text"} autofocus />);
    const input = screen.getByTestId<HTMLInputElement>("input");
    expect(input).toEqual(document.activeElement);
  });

  test("should change value on input", () => {
    render(<Input placeholder={"Placeholder text"} />);
    const input = screen.getByTestId<HTMLInputElement>("input");
    fireEvent.input(input, { target: { value: "test string" } });
    expect(input.value).toBe("test string");
  });

  test("should render caret on focus", () => {
    render(<Input placeholder={"Placeholder text"} />);
    const input = screen.getByTestId<HTMLInputElement>("input");
    fireEvent.focus(input);
    const caret = screen.getByTestId<HTMLSpanElement>("input-caret");
    expect(caret).toBeInTheDocument();
  });

  test("should change caret position on input", () => {
    render(<Input placeholder={"Placeholder text"} />);
    const input = screen.getByTestId<HTMLInputElement>("input");
    fireEvent.focus(input);
    fireEvent.input(input, { target: { value: "test" } });
    const caret = screen.getByTestId<HTMLSpanElement>("input-caret");
    expect(caret.style.left).toBe("36px");
  });
});
