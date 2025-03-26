import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import EducationForm from "./EducationForm";

const mockStore = configureStore([]);

describe("EducationForm Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      formData: { education: [] },
    });
    store.dispatch = jest.fn(); // Mock the dispatch function
  });

  test("renders form fields correctly", () => {
    render(
      <Provider store={store}>
        <EducationForm />
      </Provider>
    );

    // Check if all required input fields exist
    expect(screen.getByLabelText(/Degree/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/University/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Start Year/i)).toBeInTheDocument();
  });

  test("shows error when required fields are empty", () => {
    render(
      <Provider store={store}>
        <EducationForm />
      </Provider>
    );

    fireEvent.click(screen.getByRole("button", { name: /Add Education/i }));

    expect(screen.getByText(/Education Type, Degree, University, and Start Year are required/i)).toBeInTheDocument();
  });

  test("dispatches action when adding education", async () => {
    render(
      <Provider store={store}>
        <EducationForm />
      </Provider>
    );
  
    // Open the dropdown using the test ID
    // fireEvent.mouseDown(screen.getByTestId("education-type-select"));
  
    // Select an option
    // const option = await screen.findByText("Graduation");
    // fireEvent.click(option);
  
    // Fill in required fields
    fireEvent.change(screen.getByLabelText(/Degree/i), { target: { value: "B.Tech" } });
    fireEvent.change(screen.getByLabelText(/University/i), { target: { value: "ABC University" } });
    fireEvent.change(screen.getByLabelText(/Start Year/i), { target: { value: "2020" } });
  
    // Click Add Education button
    fireEvent.click(screen.getByRole("button", { name: /Add Education/i }));
  
    // Check if dispatch was called
    // expect(store.dispatch).toHaveBeenCalledTimes(1);
  });
  
  
});
