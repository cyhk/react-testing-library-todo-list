import React from "react";
import { render, fireEvent, cleanup, wait } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Todo from "./Todo";

describe("Todo", () => {
  it("displays the task", () => {
    const { getByText } = render(<Todo task="write test" />);

    expect(getByText("write test")).toBeInTheDocument();
  });

  it("updates text on edit and save", () => {
    const editTask = jest.fn();
    const { getByText, getByTestId } = render(<Todo task='write test' editInList={editTask}/>);
    fireEvent.click(getByText("Edit"));
    const input = getByTestId("task-edit-input");

    fireEvent.change(input, { target: { value: 'write more tests'}});
    expect(input.value).toBe('write more tests');

    fireEvent.click(getByText("Save"));
    expect(getByText("Edit")).toBeInTheDocument();
    expect(getByText("write more tests")).toBeInTheDocument();
  });
});