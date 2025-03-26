import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import WorkExperienceForm from '../../components/Forms/WorkExperienceForm';
import { saveWorkExperience } from '../../redux/formDataSlice';

const mockStore = configureStore([]);

describe('WorkExperienceForm', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      formData: {
        workExperience: [],
      },
    });
    store.dispatch = jest.fn();
  });

  test('renders the form correctly', () => {
    render(
      <Provider store={store}>
        <WorkExperienceForm />
      </Provider>
    );

    expect(screen.getByText(/Add Work Experience/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Job Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Company Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Start Year/i)).toBeInTheDocument();
    expect(screen.getByText(/Add Experience/i)).toBeInTheDocument();
  });

  test('adds a new work experience', () => {
    render(
      <Provider store={store}>
        <WorkExperienceForm />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/Job Title/i), { target: { value: 'Software Engineer' } });
    fireEvent.change(screen.getByLabelText(/Company Name/i), { target: { value: 'Tech Corp' } });
    fireEvent.change(screen.getByLabelText(/Start Year/i), { target: { value: '2020' } });

    fireEvent.click(screen.getByText(/Add Experience/i));

    expect(store.dispatch).toHaveBeenCalledWith(
      saveWorkExperience([
        {
          jobTitle: 'Software Engineer',
          companyName: 'Tech Corp',
          startYear: '2020',
          endYear: '',
          jobDescription: '',
        },
      ])
    );
  });

  test('shows error if required fields are missing', () => {
    render(
      <Provider store={store}>
        <WorkExperienceForm />
      </Provider>
    );

    fireEvent.click(screen.getByText(/Add Experience/i));

    expect(screen.getByText(/Job Title, Company Name, and Start Year are required./i)).toBeInTheDocument();
  });

  test('removes a work experience', () => {
    store = mockStore({
      formData: {
        workExperience: [
          { jobTitle: 'Software Engineer', companyName: 'Tech Corp', startYear: '2020', endYear: '', jobDescription: '' },
        ],
      },
    });
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <WorkExperienceForm />
      </Provider>
    );

    fireEvent.click(screen.getByText(/Remove/i));

    expect(store.dispatch).toHaveBeenCalledWith(saveWorkExperience([]));
  });
});
