import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import PersonalInfoForm from "./PersonalInfoForm";
import { savePersonalInfo } from "../../redux/formDataSlice";

const mockStore = configureStore([]);
let store;

beforeEach(() => {
  store = mockStore({
    formData: {
      personalInfo: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        objective: "",
        github: "",
        linkedin: "",
      },
    },
  });
  store.dispatch = jest.fn();
});

test("renders form fields correctly", () => {
  render(
    <Provider store={store}>
      <PersonalInfoForm />
    </Provider>
  );

  expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument();
  expect(screen.getByText(/Save/i)).toBeInTheDocument();
});

test("shows validation errors when required fields are empty", async () => {
  render(
    <Provider store={store}>
      <PersonalInfoForm />
    </Provider>
  );

  await act(async () => {
    fireEvent.click(screen.getByText(/Save/i));
  });

  expect(await screen.findByText(/First Name is required/i)).toBeInTheDocument();
  expect(await screen.findByText(/Email is required/i)).toBeInTheDocument();
  expect(await screen.findByText(/Phone number is required/i)).toBeInTheDocument();
});

test("dispatches action when form is submitted with valid data", async () => {
  render(
    <Provider store={store}>
      <PersonalInfoForm />
    </Provider>
  );

  await act(async () => {
    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: "John" } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: "john@example.com" } });
    fireEvent.change(screen.getByLabelText(/Phone Number/i), { target: { value: "1234567890" } });
  });

  await act(async () => {
    fireEvent.click(screen.getByText(/Save/i));
  });

  expect(store.dispatch).toHaveBeenCalledWith(
    savePersonalInfo({
      firstName: "John",
      lastName: "",
      email: "john@example.com",
      phone: "1234567890",
      address: "",
      objective: "",
      github: "",
      linkedin: "",
    })
  );
});
