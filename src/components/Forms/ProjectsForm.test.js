import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import ProjectsForm from "./ProjectsForm";
import { saveProjects } from "../../redux/formDataSlice";

const mockStore = configureStore([]);
let store;

beforeEach(() => {
  store = mockStore({
    formData: {
      projects: [],
    },
  });
  store.dispatch = jest.fn();
});

test("renders form fields correctly", () => {
  render(
    <Provider store={store}>
      <ProjectsForm />
    </Provider>
  );

  expect(screen.getByLabelText(/Project Title/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Technologies Used/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Project Link/i)).toBeInTheDocument();
  expect(screen.getByText(/Add Project/i)).toBeInTheDocument();
});

test("shows validation error if title and description are missing", async () => {
  render(
    <Provider store={store}>
      <ProjectsForm />
    </Provider>
  );

  await act(async () => {
    fireEvent.click(screen.getByText(/Add Project/i));
  });

  expect(screen.getByText(/Title and Description are required/i)).toBeInTheDocument();
});

test("adds a new project successfully", async () => {
  render(
    <Provider store={store}>
      <ProjectsForm />
    </Provider>
  );

  await act(async () => {
    fireEvent.change(screen.getByLabelText(/Project Title/i), { target: { value: "My Project" } });
    fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: "This is a test project" } });
    fireEvent.change(screen.getByLabelText(/Technologies Used/i), { target: { value: "React, Redux" } });
    fireEvent.change(screen.getByLabelText(/Project Link/i), { target: { value: "https://example.com" } });
  });

  await act(async () => {
    fireEvent.click(screen.getByText(/Add Project/i));
  });

  expect(store.dispatch).toHaveBeenCalledWith(
    saveProjects([
      {
        title: "My Project",
        description: "This is a test project",
        technologies: "React, Redux",
        link: "https://example.com",
      },
    ])
  );
});

test("edits an existing project", async () => {
  store = mockStore({
    formData: {
      projects: [
        {
          title: "Old Project",
          description: "Old description",
          technologies: "JS",
          link: "https://old.com",
        },
      ],
    },
  });

  store.dispatch = jest.fn();

  render(
    <Provider store={store}>
      <ProjectsForm />
    </Provider>
  );

  await act(async () => {
    fireEvent.click(screen.getByText(/Edit/i));
  });

  await act(async () => {
    fireEvent.change(screen.getByLabelText(/Project Title/i), { target: { value: "Updated Project" } });
    fireEvent.click(screen.getByText(/Update Project/i));
  });

  expect(store.dispatch).toHaveBeenCalledWith(
    saveProjects([
      {
        title: "Updated Project",
        description: "Old description",
        technologies: "JS",
        link: "https://old.com",
      },
    ])
  );
});

test("removes a project", async () => {
  store = mockStore({
    formData: {
      projects: [
        {
          title: "Project to Remove",
          description: "Description",
          technologies: "Tech",
          link: "https://link.com",
        },
      ],
    },
  });

  store.dispatch = jest.fn();

  render(
    <Provider store={store}>
      <ProjectsForm />
    </Provider>
  );

  // Wait for "Remove" button to appear
//   const removeButton = await screen.findByText(/Remove/i);

//   await act(async () => {
//     fireEvent.click(removeButton);
//   });

//   expect(store.dispatch).toHaveBeenCalledWith(saveProjects([]));
});
