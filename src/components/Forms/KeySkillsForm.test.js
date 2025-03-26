import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import KeySkillsForm from "../../components/Forms/KeySkillsForm";
import { saveKeySkills } from "../../redux/formDataSlice";

const mockStore = configureStore([]);
let store;

beforeEach(() => {
  store = mockStore({
    formData: {
      keySkills: [],
    },
  });
  store.dispatch = jest.fn(); // Mock dispatch function
});

test("renders form fields correctly", () => {
  render(
    <Provider store={store}>
      <KeySkillsForm />
    </Provider>
  );

  expect(screen.getByLabelText(/Skill Name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Proficiency Level/i)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /Add Skill/i })).toBeInTheDocument();
});

test("shows error when required fields are empty", () => {
  render(
    <Provider store={store}>
      <KeySkillsForm />
    </Provider>
  );

  fireEvent.click(screen.getByRole("button", { name: /Add Skill/i }));

  expect(screen.getByText(/Skill Name and Proficiency Level are required/i)).toBeInTheDocument();
});

test("dispatches action when adding a skill", () => {
  render(
    <Provider store={store}>
      <KeySkillsForm />
    </Provider>
  );

  // Fill in form
  fireEvent.change(screen.getByLabelText(/Skill Name/i), { target: { value: "JavaScript" } });

  // Click add skill button
  fireEvent.click(screen.getByRole("button", { name: /Add Skill/i }));

});
