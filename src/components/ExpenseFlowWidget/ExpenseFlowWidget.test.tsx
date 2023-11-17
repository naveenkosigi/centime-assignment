import { act, render, screen, waitFor } from "@testing-library/react";
import ExpenseFlowWidget from "./ExpenseFlowWidget";
import { Provider } from "react-redux";
import { store } from "../../store/store";
import userEvent from "@testing-library/user-event";
import ReactTestRenderer from "react-test-renderer";

describe("Expense Flow Widget", () => {

  test("Generating Snapshot",() => {
    const json = ReactTestRenderer.create(<ExpenseFlowWidgetWrapper />).toJSON();
    expect(json).toMatchSnapshot();
  })

  test("testing Inital Widget State", () => {
    render(<ExpenseFlowWidgetWrapper />);

    const addButton = screen.getByText("expense_tracker.addButton");
    expect(addButton).toBeInTheDocument();
  });

  test("testing Add Expense", async () => {
    render(<ExpenseFlowWidgetWrapper />);

    act(() => {
      const addExpenseButton = screen.getByText("expense_tracker.addButton");
      userEvent.click(addExpenseButton);
    });

    expect(screen.getByText("expense_tracker.save")).toBeInTheDocument();
    expect(screen.getByText("expense_tracker.cancel")).toBeInTheDocument();
  });

  test("testing Add Expense and Cancel", async () => {
    render(<ExpenseFlowWidgetWrapper />);

    act(() => {
      const addExpenseButton = screen.getByText("expense_tracker.addButton");
      userEvent.click(addExpenseButton);
    });

    act(() => {
      const cancelButton = screen.getByText("expense_tracker.cancel");
      userEvent.click(cancelButton);
    });

    expect(screen.getByText("expense_tracker.addButton")).toBeInTheDocument();
  });
});

const ExpenseFlowWidgetWrapper = () => {
  return (
    <Provider store={store}>
      <ExpenseFlowWidget />
    </Provider>
  );
};
